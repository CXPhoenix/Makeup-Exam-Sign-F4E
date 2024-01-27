<script setup>
const {student} = defineProps(["student"])
</script>

<template>
    <div class="w-full flex justify-around items-center rounded-md shadow-md p-3">
        <p class="">{{ student._id }}</p>
        <p class="">{{ `${student.grade}${student.class_num.toString().padStart(2, "0")}` }}</p>
        <p class="">{{ student.seat_num }}</p>
        <p class="">{{ student.name }}</p>
    </div>
</template>