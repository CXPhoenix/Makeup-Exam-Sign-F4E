<script setup>
const { action } = defineProps(["action"]);
</script>

<template>
  <div
    class="flex flex-col justify-between items-start p-4 rounded-md bg-gray-200"
  >
    <h2 class="text-xl font-bold">你沒有權限查看</h2>
    <p class="text-sm space-y-4">你沒有任何權限查看這個頁面！</p>
    <div class="self-end">
      <button class="px-4 py-2 bg-gray-400 rounded-md" @click="() => action()">
        返回首頁
      </button>
    </div>
  </div>
</template>
