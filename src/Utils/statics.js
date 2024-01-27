import reqs from "./requests.js";
import {
  states,
  static_data,
  get_access_token,
  error_data,
  course_static_data,
} from "./data.js";

const handle_courses = (courses) => {
  return courses.filter((course) => course.should_sign_num > 0);
};

export const get_all_static_data = async () => {
  states.static_data_ready = false;
  const access_token = get_access_token();
  const result = await reqs.get_static_data(access_token);
  if (result.status === 403 || result.status === 404) {
    states.no_access_occur = true;
    return;
  }
  if (result.status !== 200) {
    error_data.status = result.status;
    error_data.desc = result.desc;
    states.error_occur = true;
    return;
  }

  Object.keys(result.data.courses).forEach((grade) => {
    static_data.courses[grade] = handle_courses(result.data.courses[grade]);
  });

  states.static_data_ready = true;
};

export const get_course_static_data = async (course_id, grade) => {
  states.course_static_data_ready = false;
  const access_token = get_access_token();
  const result = await reqs.get_course_data(access_token, course_id, grade);
  if (result.status === 401 || result.status === 403) {
    states.no_access_occur = true;
    return;
  }
  if (result.status !== 200) {
    print(result)
    error_data.status = result.status;
    error_data.desc = result.desc;
    states.error_occur = true;
    return;
  }
  course_static_data.course = { ...result.data.course };
  states.course_static_data_ready = true;
};
