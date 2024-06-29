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
  <swiper indicator-dots autoplay circular class="banner">
    <swiper-item>
      <image src="@/static/publish.png" mode="scaleToFill" />
    </swiper-item>
    <swiper-item>
      <image src="@/static/search_icon.png" mode="scaleToFill" />
    </swiper-item>
  </swiper>
  <view class="discussion">
    <DiscussionList />
  </view>
</template>

<script setup lang="ts">
import DiscussionList from "@/components/DiscussionList.vue";
import { ref } from "vue";

const searchContent = ref("");
const onPublish = () => {
  console.log("publish");
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
.banner {
  margin-top: 32px;
  height: 200px;
}
.discussion {
  margin: 0 auto;
  margin-top: 32px;
  width: 312px;
}
</style>
