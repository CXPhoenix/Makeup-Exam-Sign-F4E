<script setup>
const props = defineProps(["attr"]);
const class_object = {
  "bg-blue-400": props.attr === "needed",
  "bg-yellow-300": props.attr === "signed",
  "bg-[#FA8371]": props.attr === "multi",
};
</script>

<template>
  <div class="p-1 flex justify-center items-center gap-3">
    <div class="h-4 w-10" :class="class_object"></div>
    <p><slot></slot></p>
  </div>
</template>
