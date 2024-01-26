<script setup>
import { google_login_callback } from "../Utils/logins.js";
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-8">
    <h1 class="text-3xl md:text-5xl font-bold">復興高中補考登記系統</h1>
    <h2 class="text-xl md:text-3xl">請登入後進行補考登記</h2>
    <div class="py-4 text-xs md:text-xl space-y-4">
      <p>
        若有任何成績問題，請聯繫教務處註冊組
        <br class="md:hidden" />(02)2891-4131 轉 221、222
      </p>
      <p>
        其他補考相關問題，請洽教務處較學組
        <br class="md:hidden" />(02)2891-4131 轉 210、211
      </p>
      <p>
        若有任何系統問題，請聯繫圖書館資訊組
        <br class="md:hidden" />(02)2891-4131 轉 641 陳系統師
      </p>
    </div>
    <GoogleLogin :callback="google_login_callback" />
  </div>
</template>
