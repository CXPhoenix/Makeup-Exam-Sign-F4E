<script setup>
/**
 * "name",
 * "is_multivariate",
 * "course_teacher_note",
 * "is_signed",
 */
const { course } = defineProps(["course"]);
const border_class_object = {
  "cursor-pointer": !course.is_multivariate_assessment,
  "cursor-not-allowed": course.is_multivariate_assessment,
  "bg-blue-400": !course.is_signed && !course.is_multivariate_assessment,
  "bg-yellow-300": course.is_signed && !course.is_multivariate_assessment,
  "bg-[#FA8371]": course.is_multivariate_assessment,
  "hover:bg-blue-600": !course.is_signed && !course.is_multivariate_assessment,
  "hover:bg-yellow-500": course.is_signed && !course.is_multivariate_assessment,
};
</script>

<template>
  <div
    class="w-[80%] py-5 px-3 border-none rounded-lg flex flex-col justify-center items-start relative"
    :class="border_class_object"
  >
    <p
      :class="[
        course.is_signed ? 'text-gray-700' : 'text-gray-100',
        'text-xl',
        'font-bold',
      ]"
    >
      {{ course.name
      }}{{ course.is_multivariate_assessment ? "【不用申請】" : ""
      }}{{ course.is_signed ? "【已申請】" : "" }}
    </p>
    <div
      v-if="course.is_multivariate_assessment"
      class="bg-gray-800 w-full h-[1px] my-2"
    ></div>
    <p
      v-if="course.is_multivariate_assessment"
      class="text-gray-600 text-sm pl-4"
    >
      {{ course.course_teacher_note }}
    </p>
    <span
      v-if="course.is_selected"
      class="absolute right-6 inset-y-5 text-xl text-white"
    >
      <font-awesome-icon v-if="!course.is_signed" :icon="['fas', 'plus']" />
      <font-awesome-icon v-if="course.is_signed" :icon="['fas', 'minus']" />
    </span>
  </div>
</template>
