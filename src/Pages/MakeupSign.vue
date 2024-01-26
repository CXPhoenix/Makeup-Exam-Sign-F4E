<script setup>
import { onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { user_data, states } from "../Utils/data";
import {
  get_user_aka_student_makeup_data,
  post_sign_records,
} from "../Utils/makeup_info";

import Card from "../components/Card.vue";
import ColorLegend from "../components/ColorLegend.vue";

import cheer_up from "../assets/cheer_up.png";

const router = useRouter();

const makeup_exam_courses = reactive({
  list: [],
  selected: [],
});

const select_item = (course) => {
  if (course.is_multivariate_assessment) {
    return;
  }
  course.is_selected = !course.is_selected;
  const idx = makeup_exam_courses.selected.findIndex(
    (selected) => selected._id == course._id
  );
  if (course.is_selected) {
    if (idx < 0) {
      makeup_exam_courses.selected.push(course);
    }
  } else {
    if (idx > -1) {
      makeup_exam_courses.selected.splice(idx, 1);
    }
  }
};

const post_signing_makeup_data = async () => {
  const post_data = user_data.makeup_signs.map((sign) => sign._id);
  makeup_exam_courses.selected.forEach((course) => {
    const idx = post_data.findIndex((data) => data == course._id);
    if (!course.is_signed) {
      post_data.push(course._id);
    } else {
      post_data.splice(idx, 1);
    }
  });
  await post_sign_records({ course_ids: post_data });
  states.is_check_already = true;
};

watch(
  () => user_data.makeup_signs,
  (value) => {
    makeup_exam_courses.list = [];
    user_data.makeup_needed.forEach((needed_course) => {
      const idx = user_data.makeup_signs.findIndex(
        (sign) => needed_course._id === sign._id
      );
      if (idx < 0) {
        makeup_exam_courses.list.push({
          ...needed_course,
          is_signed: false,
          is_selected: false,
        });
        return;
      }
      makeup_exam_courses.list.push({
        ...needed_course,
        is_signed: true,
        is_selected: false,
      });
    });
  }
);

onMounted(async () => {
  await get_user_aka_student_makeup_data();
  // user_data.makeup_needed.forEach((needed_course) => {
  //   const idx = user_data.makeup_signs.findIndex(
  //     (sign) => needed_course._id === sign._id
  //   );
  //   if (idx < 0) {
  //     makeup_exam_courses.list.push({
  //       ...needed_course,
  //       is_signed: false,
  //       is_selected: false,
  //     });
  //     return;
  //   }
  //   makeup_exam_courses.list.push({
  //     ...needed_course,
  //     is_signed: true,
  //     is_selected: false,
  //   });
  // });
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col gap-6 justify-center items-center"
    v-if="!states.have_makeup_sign_value"
  >
    <font-awesome-icon :icon="['fas', 'person-running']" />
    <p class="uppercase text-gray-700">working...</p>
  </div>
  <div
    v-if="states.void_student"
    class="w-full h-[90%] flex flex-col gap-6 justify-center items-center"
  >
    <img class="w-[60vw] max-w-[450px]" :src="cheer_up" alt="" />
    <p class="text-lg font-bold">
      你沒有任何學科要補考！
      <font-awesome-icon :icon="['fas', 'champagne-glasses']" />
    </p>
  </div>
  <div
    class="w-full h-full flex flex-col gap-4 justify-start items-center pt-8"
    v-if="states.have_makeup_sign_value && !states.void_student"
  >
    <div class="self.start">
      <h2 class="text-center text-2xl pb-4">系統使用規則</h2>
      <p class="">
        以下出現的科目為「學期總成績 <b>40 ~ 59</b> 分區間」之科目。<br />
        請依據需求點選要補考的科目，並按下「確認送出」按鈕送出申請。<br />
        <span class="flex justify-start items-center gap-3">
          <ColorLegend attr="needed">待選</ColorLegend>
          <span>-- 表示還未申請的科目</span>
        </span>
        <span class="flex justify-start items-center gap-3">
          <ColorLegend attr="signed">已選</ColorLegend>
          <span>-- 表示已申請補考的科目(已註記於系統中)</span>
        </span>
        <span class="flex justify-start items-center gap-3">
          <ColorLegend attr="multi">多元評量</ColorLegend>
          <span>-- 表示該科目採多元評量方式補考，無需申請</span>
        </span>
        若要取消申請補考科目，於點選該科目後按下「確認送出」按鈕，即可取消。
      </p>
    </div>
    <div
      id="icon_present_info"
      class="w-full py-2 flex justify-around items-center"
    >
      <ColorLegend attr="needed">待選</ColorLegend>
      <ColorLegend attr="signed">已選</ColorLegend>
      <ColorLegend attr="multi">多元評量</ColorLegend>
    </div>
    <Card
      v-for="course in makeup_exam_courses.list"
      :key="course._id"
      :course="course"
      @click="() => select_item(course)"
    />
    <div class="pt-4">
      <button
        v-if="!states.is_check_already"
        @click="() => post_signing_makeup_data()"
        class="bg-green-600 text-gray-100 px-8 py-4 rounded-lg"
      >
        確認送出
      </button>
      <button
        v-if="states.is_check_already"
        @click="
          () => {
            states.rerender_key += 1;
            states.is_check_already = false;
          }
        "
        class="bg-sky-600 text-gray-100 px-8 py-4 rounded-lg"
      >
        重新整理
      </button>
    </div>
  </div>
</template>
