import { user_data, states, get_access_token, error_data } from "./data.js";
import reqs from "./requests.js";

export const get_user_aka_student_makeup_data = async () => {
  const access_token = get_access_token();
  const result = await reqs.get_user_makeup_info(access_token);
  if (result.status === 400) {
    states.void_student = true;
    states.have_makeup_sign_value = true;
    return;
  }
  if (result.status !== 200) {
    error_data.status = result.status;
    error_data.desc = result.desc;
    states.error_occur = true;
    return;
  }
  user_data.makeup_needed = result.data.makeup_needed;
  user_data.makeup_signs = result.data.makeup_signs;
  states.have_makeup_sign_value = true;
};

export const post_sign_records = async (post_data) => {
  states.have_makeup_sign_value = false;
  const access_token = get_access_token();
  const result = await reqs.post_makeup_sign_result(access_token, post_data);
  if (result.status !== 200) {
    error_data.status = result.status;
    error_data.desc = result.desc;
    states.error_occur = true;
    return;
  }
  user_data.makeup_needed = result.data.makeup_needed;
  user_data.makeup_signs = result.data.makeup_signs;
  states.have_makeup_sign_value = true;
};
