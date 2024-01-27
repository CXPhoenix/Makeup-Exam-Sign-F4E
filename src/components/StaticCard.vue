<script setup>
const {
  course_id,
  course_name,
  should_sign_num,
  signed_num,
  show,
  can_select,
} = defineProps([
  "course_id",
  "course_name",
  "should_sign_num",
  "signed_num",
  "show",
  "can_select",
]);

const card_contaner_css = {
  "justify-between": show !== "long",
  "items-start": show !== "long",
  "justify-center": show === "long",
  "items-start": show === "long",
  "gap-6": show === "long",
  "sm:flex-row": show !== "long",
  "sm:items-start": show !== "long",
  "shadow-md": can_select,
  "hover:shadow-md-hover": can_select,
  "hover:-translate-x-1.5": can_select,
  "hover:-translate-y-1": can_select,
};
</script>

<template>
  <div class="w-full p-4 flex flex-col rounded-md" :class="card_contaner_css">
    <h3 class="text-2xl font-bold">{{ course_id }} {{ course_name }}</h3>
    <p v-if="show !== 'long'" class="text-lg self-end">
      <span>{{ signed_num }}</span>
      /
      <span>{{ should_sign_num }}</span>
    </p>
    <p
      v-if="show === 'long'"
      class="text-lg flex flex-col justify-start items-start gap-4 sm:flex-row sm:items-center"
    >
      <span>應選填人數：{{ should_sign_num }}</span>
      <span>已選填人數：{{ signed_num }}</span>
    </p>
  </div>
</template>
