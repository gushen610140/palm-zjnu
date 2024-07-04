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
    <swiper-item v-for="banner in bannerList" :key="banner.url">
      <image
        class="banner_img"
        :src="`http://127.0.0.1:8080/api/images/banners/${banner.url}`"
        mode="scaleToFill"
      />
    </swiper-item>
  </swiper>
  <view class="moments">
    <MomentList :updateComponent="updateComponent" />
  </view>
</template>

<script setup lang="ts">
import MomentList from "@/components/MomentList.vue";
import { ref } from "vue";
import { getBannerListAPI } from "@/api/getBannerList";
import { Banner } from "@/types/Banner";
import { onLoad, onShow } from "@dcloudio/uni-app";

const bannerList = ref<Banner[]>();
onLoad(() => {
  getBannerListAPI().then((res) => {
    bannerList.value = res;
  });
});

const searchContent = ref("");
const onPublish = () => {
  uni.navigateTo({
    url: "/pages/publishMoment/index",
  });
};

const updateComponent = ref<number>(0);
onShow(() => {
  updateComponent.value += 1;
});
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
  margin: 0 auto;
  margin-top: 32px;
  height: 200px;
  width: 85%;
}
.banner_img {
  width: 100%;
  height: 100%;
}
.moments {
  margin: 0 auto;
  margin-top: 32px;
  width: 312px;
}
</style>
