<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import LogoPng from "./assets/celebrate-70-logo.png";
import {
  states,
  user_data,
  error_data,
  get_access_token,
} from "./Utils/data.js";
import { logout, get_user_from_access_token } from "./Utils/logins.js";

import ErrorAlert from "./components/ErrorAlert.vue";
import NoAccessAlert from "./components/NoAccessAlert.vue";

const router = useRouter();

watch(
  () => states.user_data_have_value,
  (have_value) => {
    if (have_value) {
      router.push("/makeup-sign");
      return;
    }
    const access_token = get_access_token();
    if (access_token !== null) {
      get_user_from_access_token(access_token);
    } else {
      router.push("/");
    }
  }
);

onMounted(() => {
  states.user_data_have_value = false;
  const access_token = get_access_token();
  if (access_token !== null) {
    get_user_from_access_token(access_token);
  } else {
    router.push("/");
  }
});

const close_alert_action = () => {
  router.push("/");
  states.error_occur = false;
  logout();
};
</script>

<template>
  <header
    class="w-full p-2 bg-white flex flex-col justify-center items-start md:flex-row md:justify-between md:items-center select-none"
  >
    <router-link to="/" class="p-1 flex justify-center items-center gap-2">
      <img :src="LogoPng" alt="LOGO" class="w-8" />
      <p class="text-slate-700">復興高中補考登記系統</p>
    </router-link>
    <div
      class="p-1 flex justify-center items-center gap-3 self-end md:self-center"
      v-if="states.user_data_have_value"
    >
      <p>
        歡迎回來，{{ user_data.given_name }} (
        <span
          class="underline underline-offset-1 text-blue-400 cursor-pointer hover:text-blue-600"
          @click="logout"
          >登出</span
        >
        )
        <router-link
          v-if="user_data.static"
          to="/statics"
          class="underline underline-offset-1 text-blue-400 cursor-pointer hover:text-blue-600"
        >
          統計
        </router-link>
      </p>
    </div>
  </header>
  <main class="overflow-y-scroll space-y-2">
    <router-view :key="states.rerender_key"></router-view>
    <div class="h-14"></div>
  </main>
  <footer class="w-full flex justify-center items-center">
    <p class="uppercase">copyright by fh.mis</p>
  </footer>
  <section
    v-if="states.loading"
    class="fixed inset-0 bg-black/80 flex justify-center items-center"
  >
    <div class="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
  <section
    v-if="states.error_occur"
    class="fixed inset-0 bg-black/80 flex justify-center items-center"
  >
    <ErrorAlert :error="error_data" :action="close_alert_action" />
  </section>
  <section
    v-if="states.no_access_occur"
    class="fixed inset-0 bg-black/80 flex justify-center items-center"
  >
    <NoAccessAlert :action="close_alert_action" />
  </section>
</template>

<style scoped>
.lds-default {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
