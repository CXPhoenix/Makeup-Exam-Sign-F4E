import { reactive } from "vue";

export const states = reactive({
  user_data_have_value: false,
  error_occur: false,
  have_makeup_sign_value: false,
  loading: false,
  is_check_already: false,
  void_student: false,
  rerender_key: 0,
  no_access_occur: false,
  static_data_ready: false,
  course_static_data_ready: false,
  time_expired_occur: false,
});

export const user_data = reactive({
  init: null,
});

export const store_access_token = (access_token) => {
  localStorage.setItem("access_token", access_token);
};

export const error_data = reactive({
  status: 0,
  desc: "",
});

export const get_access_token = () => localStorage.getItem("access_token");

export const clear_storage = () => {
  localStorage.clear();
};

export const static_data = reactive({
  courses: {},
});

export const course_static_data = reactive({
  course: {},
});
