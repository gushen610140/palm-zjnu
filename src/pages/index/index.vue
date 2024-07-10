<template>
  <view class="topbar">
    <input
      v-model="searchContent"
      placeholder="在这里搜索你想看的圈子"
      class="search_input"
    />
    <image
      src="@/static/publish.png"
      mode="scaleToFill"
      class="publish"
      @click="onPublish"
    />
  </view>
  <view class="moments">
    <MomentList />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MomentList from "@/components/MomentList.vue";

const searchContent = ref("");
const onPublish = () => {
  uni.navigateTo({
    url: "/pages/index/publishMoment",
  });
};
</script>

<style scoped>
.topbar {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search_input {
  border: 1px solid #707070;
  height: 32px;
  width: 280px;
  border-radius: 16px;
  padding-left: 38px;
  background-image: url("@/static/search_icon.png");
  background-repeat: no-repeat;
  background-position: 10px center;
}
.publish {
  margin-left: 10px;
  width: 30px;
  height: 30px;
}
.moments {
  margin: 0 auto;
  margin-top: 10px;
  width: 312px;
}
</style>
