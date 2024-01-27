<script setup>
import { onMounted } from "vue";
import { states, static_data } from "../Utils/data";
import { get_all_static_data } from "../Utils/statics";

import StaticCard from "../components/StaticCard.vue";

onMounted(() => {
  get_all_static_data();
});
</script>

<template>
  <div
    :class="[
      'w-full',
      'h-full',
      'flex',
      'flex-col',
      'gap-6',
      'justify-center',
      'items-center',
    ]"
    v-if="!states.static_data_ready"
  >
    <font-awesome-icon class="text-3xl" :icon="['fas', 'person-running']" />
    <p class="uppercase text-gray-700">working...</p>
  </div>
  <div
    v-if="states.static_data_ready"
    class="w-full flex flex-col justify-start items-start gap-6"
  >
    <div class="w-full flex justify-around items-center pt-6 pb-2">
      <a
        v-for="grade in Object.keys(static_data.courses)"
        :href="`#${grade}`"
        class="text-xl text-sky-600 underline underline-offset-2 hover:font-bold"
      >
        {{ grade === "h1" ? "高一" : grade === "h2" ? "高二" : "高三" }}
      </a>
    </div>
    <div
      v-for="(grade, idx) in Object.keys(static_data.courses)"
      :key="grade"
      :id="grade"
      class="w-full flex flex-col justify-start items-start gap-6"
    >
      <h2 class="text-3xl pt-2">
        {{ grade === "h1" ? "高一" : grade === "h2" ? "高二" : "高三" }}
      </h2>
      <router-link
        class="w-full p-4"
        v-for="course in static_data.courses[grade]"
        :to="`/statics/${course._id}/${course.grade}`"
        :key="`${grade}${course._id}`"
      >
        <StaticCard
          :course_id="course._id"
          :course_name="course.name"
          :should_sign_num="course.should_sign_num"
          :signed_num="course.signed_num"
          :can_select="true"
        />
      </router-link>
      <div
        v-if="idx < Object.keys(static_data.courses).length - 1"
        class="w-full py-[2px] bg-black"
      ></div>
    </div>
  </div>
</template>
