import reqs from "./requests.js";
import { googleLogout } from "vue3-google-login";

import {
  states,
  user_data,
  store_access_token,
  clear_storage,
  error_data,
} from "./data.js";

const logout = () => {
  states.loading = true;
  clear_storage();
  states.user_data_have_value = false;
  googleLogout();
  states.loading = false;
};

const google_login_callback = async (response) => {
  states.loading = true;
  const token = response.credential;
  const result = await reqs.login_with_google_id_token(token);
  if (result.status !== 200) {
    error_data.status = result.status;
    error_data.desc = result.desc;
    states.error_occur = true;
    return;
  }
  user_data.email = result.data.email;
  user_data.name = result.data.name;
  user_data.family_name = result.data.family_name;
  user_data.given_name = result.data.given_name;
  user_data.static = result.data.static;

  states.user_data_have_value = true;

  store_access_token(result.data.access_token);

  states.loading = false;
};

const get_user_from_access_token = async (access_token) => {
  states.loading = true;
  const result = await reqs.login_with_access_token(access_token);
  if (result.status !== 200) {
    error_data.status = result.status;
    error_data.desc = result.desc;
    states.error_occur = true;
    logout();
    return;
  }
  user_data.email = result.data.email;
  user_data.name = result.data.name;
  user_data.family_name = result.data.family_name;
  user_data.given_name = result.data.given_name;
  user_data.static = result.data.static;

  states.user_data_have_value = true;
  states.loading = false;
};

export { get_user_from_access_token, google_login_callback, logout };
