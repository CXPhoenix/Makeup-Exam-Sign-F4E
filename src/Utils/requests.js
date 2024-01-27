export default (() => {
  const base_url = "https://makeup-exam-api.fhsh.taipei";
  const url = {
    get_user_from_google: new URL("/user/from_google", base_url),
    get_user_with_access_token: new URL("/user/", base_url),
    get_user_makeup_info: new URL("/exam-sign/", base_url),
    post_sign_data: new URL("/exam-sign/", base_url),
    get_static_data: new URL("/statics/", base_url),
    get_course_static_data: new URL("/statics/", base_url),
  };

  const get_options = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  };

  const post_options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  };

  const get_requests = async (token_object, url) => {
    const get_user_fetch_options = { ...get_options };
    if (token_object.id_token) {
      get_user_fetch_options.headers["id-token"] = token_object.id_token;
    }
    if (token_object.access_token) {
      get_user_fetch_options.headers["access-token"] =
        token_object.access_token;
    }
    const resp = await fetch(url, get_user_fetch_options);
    const result = {
      status: resp.status,
    };
    if (!resp.ok) {
      const error = await resp.json();
      result.desc = error.detail;
      return result;
    }
    const data = await resp.json();
    result.data = { ...data };
    return result;
  };

  const post_requests = async (token_object, url, payload) => {
    const post_data_fetch_options = { ...post_options };
    if (token_object.id_token) {
      post_data_fetch_options.headers["id-token"] = token_object.id_token;
    }
    if (token_object.access_token) {
      post_data_fetch_options.headers["access-token"] =
        token_object.access_token;
    }
    post_data_fetch_options.body = JSON.stringify(payload);
    const resp = await fetch(url, post_data_fetch_options);
    const result = {
      status: resp.status,
    };
    if (!resp.ok) {
      const error = await resp.json();
      result.desc = error.detail;
      return result;
    }
    const data = await resp.json();
    result.data = { ...data };
    return result;
  };

  return {
    login_with_google_id_token: async (id_token) => {
      return await get_requests({ id_token }, url.get_user_from_google);
    },
    login_with_access_token: async (access_token) => {
      return await get_requests(
        { access_token },
        url.get_user_with_access_token
      );
    },
    get_user_makeup_info: async (access_token) => {
      return get_requests({ access_token }, url.get_user_makeup_info);
      // const get_user_fetch_options = { ...get_options };
      // get_user_fetch_options.headers["access-token"] = access_token;
      // const resp = await fetch(
      //   url.get_user_makeup_info,
      //   get_user_fetch_options
      // );
      // const result = {
      //   status: resp.status,
      //   desc: resp.statusText,
      // };
      // if (!resp.ok) {
      //   return result;
      // }
      // const data = await resp.json();
      // result.data = { ...data };
      // return result;
    },
    post_makeup_sign_result: async (access_token, payload) => {
      return post_requests({ access_token }, url.post_sign_data, payload);
    },
    get_static_data: async (access_token) => {
      return get_requests({ access_token }, url.get_static_data);
    },
    get_course_data: async (access_token, course_id, grade) => {
      const new_url = new URL(`/statics/${course_id}`, base_url);
      new_url.searchParams.append("grade", grade);
      console.log(new_url.toString());
      return get_requests({ access_token }, new_url);
    },
  };
})();
