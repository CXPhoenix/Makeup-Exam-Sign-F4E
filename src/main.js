import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./Utils/router.js";
import FontAwesomeIcon from "./Utils/font-awsome.js";

import GoogleLoginPlugin from "vue3-google-login";

createApp(App)
  .use(router)
  .use(GoogleLoginPlugin, {
    clientId:
      "664184999040-i2katqgs619kkdjj71m212mss56vo48g.apps.googleusercontent.com",
    buttonConfig: {
      size: "large",
      text: "continue_with",
    },
  })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
