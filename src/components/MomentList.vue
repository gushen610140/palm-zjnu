<template>
  <view class="container">
    <view class="moment" v-for="moment in momentList">
      <view class="user_name">{{ moment.userName }}</view>
      <view class="content">{{ moment.content }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { ref, onMounted } from "vue";
import { Moment } from "@/types/Moment.ts";
const momentList = ref<Moment[]>([]);

const getMomentList = () => {
  http<Moment[]>({
    url: "/api/moments",
    method: "GET",
    data: {
      current: 1,
      size: 10,
    },
  }).then((res) => {
    momentList.value = res;
  });
};

onMounted(() => {
  getMomentList();
});
</script>

<style scoped>
.body {
  width: 312px;
  display: flex;
  flex-direction: column;
  border: 1px solid #707070;
}
.moment {
  width: 312px;
  border-bottom: 1px solid #707070;
}
</style>
