<template>
  <scroll-view
    scroll-y="true"
    class="container"
    lower-threshold="10"
    @scrolltolower="onScrollToLower"
  >
    <view class="moment" v-for="moment in momentList">
      <view class="user_name">{{ moment.userName }}</view>
      <view class="content">{{ moment.content }}</view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Moment } from "@/types/Moment.ts";
import { getMomentListAPI } from "@/api/getMomentList";

const momentList = ref<Moment[]>([]);

type PageProperty = {
  current: number;
  size: number;
};

const pageProperty = ref<PageProperty>({
  current: 1,
  size: 10,
});

const onScrollToLower = () => {
  pageProperty.value.current += 1;
  getMomentListAPI(pageProperty.value.current, pageProperty.value.size).then(
    (res) => {
      momentList.value = momentList.value.concat(res);
    }
  );
};

onMounted(() => {
  getMomentListAPI(pageProperty.value.current, pageProperty.value.size).then(
    (res) => {
      momentList.value = res;
    }
  );
});
</script>

<style scoped>
.container {
  width: 312px;
  height: 360px;
}
.moment {
  width: 312px;
  border-bottom: 1px solid #707070;
}
</style>
