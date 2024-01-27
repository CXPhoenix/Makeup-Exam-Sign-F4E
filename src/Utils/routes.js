import Home from "../Pages/Home.vue";
import MakeupSign from "../Pages/MakeupSign.vue";
import Static from "../Pages/Static.vue";
import CourseStatic from "../Pages/CourseStatic.vue";

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/makeup-sign",
    component: MakeupSign,
  },
  {
    path: "/statics",
    component: Static,
  },
  {
    path: "/statics/:course_id/:grade",
    component: CourseStatic,
  },
];
