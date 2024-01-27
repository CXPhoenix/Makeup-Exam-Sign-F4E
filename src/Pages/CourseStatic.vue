<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { states, course_static_data } from "../Utils/data.js";
import { get_course_static_data } from "../Utils/statics.js";

import StaticCard from "../components/StaticCard.vue";
import StudentStaticCard from "../components/StudentStaticCard.vue";

const route = useRoute();
const sign_state_students = reactive({
  signed: [],
  unsigned: [],
});

onMounted(() => {
  const course_id = route.params.course_id;
  const grade = parseInt(route.params.grade);
  get_course_static_data(course_id, grade).then(() => {
    sign_state_students.signed = [
      ...course_static_data.course.needed_students.filter(
        (student) => student.is_signed_the_course
      ),
    ];
    sign_state_students.unsigned = [
      ...course_static_data.course.needed_students.filter(
        (student) => !student.is_signed_the_course
      ),
    ];
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
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
    v-if="!states.course_static_data_ready"
  >
    <font-awesome-icon class="text-3xl" :icon="['fas', 'person-running']" />
    <p class="uppercase text-gray-700">working...</p>
  </div>
  <div v-if="states.course_static_data_ready" class="w-full space-y-8">
    <router-link
      to="/statics"
      class="flex justify-start items-center gap-2 pt-6 hover:font-bold"
    >
      <font-awesome-icon class="text-xl" :icon="['fas', 'left-long']" />
      <p class="text-xl">回到統計總覽</p>
    </router-link>
    <div class="flex justify-around items-center text-lg text-sky-600">
      <a
        :href="`${course_static_data._id}-${course_static_data.grade}-signed`"
        class="underline underline-offset-1 hover:font-bold"
        >已登記</a
      >
      <a
        :href="`${course_static_data._id}-${course_static_data.grade}-unsigned`"
        class="underline underline-offset-1 hover:font-bold"
        >未登記</a
      >
    </div>
    <StaticCard
      :course_name="course_static_data.course.name"
      :should_sign_num="course_static_data.course.should_sign_num"
      :signed_num="course_static_data.course.signed_num"
      show="long"
    />
    <div
      :id="`${course_static_data._id}-${course_static_data.grade}-signed`"
      class="w-full flex flex-col justify-start items-start gap-6"
    >
      <h3 class="text-2xl font-bold">已登記學生名單</h3>
      <StudentStaticCard
        v-for="signed_student in sign_state_students.signed"
        :key="signed_student._id"
        :student="signed_student"
      />
    </div>
    <div
      :id="`${course_static_data._id}-${course_static_data.grade}-unsigned`"
      class="w-full flex flex-col justify-start items-start gap-6"
    >
      <h3 class="text-2xl font-bold">未登記學生名單</h3>
      <StudentStaticCard
        v-for="unsigned_student in sign_state_students.unsigned"
        :key="unsigned_student"
        :student="unsigned_student"
      />
    </div>
  </div>
</template>
