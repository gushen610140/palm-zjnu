<template>
  <scroll-view
    scroll-y="true"
    class="container"
    lower-threshold="10"
    @scrolltolower="onScrollToLower"
    :scroll-top="pageProperty.scrolltop"
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
  scrolltop: 100,
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
  getMomentListAPI(1, pageProperty.value.size).then((res) => {
    momentList.value = res;
  });
});

const props = defineProps<{
  updateComponent: number;
}>();
console.log(props.updateComponent);

watch(
  () => props.updateComponent,
  () => {
    getMomentListAPI(1, pageProperty.value.size).then((res) => {
      momentList.value = res;
    });
    pageProperty.value.scrolltop = 0;
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
  border-bottom: 1px solid #707070;
}
</style>
