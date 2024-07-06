<template>
  <scroll-view
    scroll-y="true"
    class="container"
    lower-threshold="50"
    @scrolltolower="onScrollToLower"
    :scroll-top="pageProperty.scrolltop"
  >
    <view class="moment" v-for="moment in momentList" :key="moment.id">
      <view class="user_name">{{ moment.userName }}</view>
      <view class="content">{{ moment.content }}</view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Moment } from "@/types/Moment.ts";
import { getMomentListAPI } from "@/api/getMomentListAPI";
import { watch } from "vue";

const momentList = ref<Moment[]>([]);

type PageProperty = {
  current: number;
  size: number;
  scrolltop: number;
};

const pageProperty = ref<PageProperty>({
  current: 1,
  size: 10,
  scrolltop: 0,
});

const onScrollToLower = () => {
  pageProperty.value.current += 1;
  getMomentListAPI(pageProperty.value.current, pageProperty.value.size).then(
    (momentListRes) => {
      momentList.value = momentList.value.concat(momentListRes.data);
    }
  );
};

onMounted(() => {
  getMomentListAPI(1, pageProperty.value.size).then((momentListRes) => {
    momentList.value = momentListRes.data;
  });
});

const props = defineProps<{
  updateComponent: number;
}>();

watch(
  () => props.updateComponent,
  () => {
    getMomentListAPI(1, pageProperty.value.size).then((momentListRes) => {
      momentList.value = momentListRes.data;
      pageProperty.value.scrolltop = Math.random();
    });
  }
);
</script>

<style scoped>
.container {
  width: 312px;
  height: 360px;
}
.moment {
  width: 312px;
  border-bottom: 1px solid #70707080;
}
</style>
@/api/getMomentListAPI
