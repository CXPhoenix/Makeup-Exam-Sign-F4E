<script setup>
const { error, action } = defineProps(["error", "action"]);
</script>

<template>
  <div
    class="flex flex-col justify-between items-start p-4 rounded-md bg-gray-200"
  >
    <h2 class="text-xl font-bold">發生預期外的問題！</h2>
    <p class="text-sm space-y-4">
      <p>code: {{ error.status }}</p>
      <p>description: {{ error.desc }}</p>
      <p>如果持續無法使用系統，請與資訊組 陳系統管理師（分機 641）聯繫</p>
    </p>
    <div class="self-end">
      <button class="px-4 py-2 bg-gray-400 rounded-md" @click="() => action()">返回首頁</button>
    </div>
  </div>
</template>
