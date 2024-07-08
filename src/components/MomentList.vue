<template>
  <scroll-view
    scroll-y="true"
    class="container"
    lower-threshold="50"
    @scrolltolower="onScrollToLower"
    :scroll-top="pageProperty.scrolltop"
  >
    <swiper indicator-dots autoplay circular class="banner">
      <swiper-item v-for="banner in bannerList" :key="banner.url">
        <image
          class="banner_img"
          :src="`http://127.0.0.1:8080/api/images/banners/${banner.url}`"
          mode="scaleToFill"
        />
      </swiper-item>
    </swiper>
    <view class="moment" v-for="moment in momentList" :key="moment.id">
      <view class="moment_container">
        <view class="avatar">
          <image
            :src="moment.userAvatar"
            mode="scaleToFill"
            class="avatar_img"
          />
        </view>
        <view class="text">
          <view class="user_name">{{ moment.userName }}</view>
          <view class="content">{{ moment.content }}</view>
          <view class="image_container">
            <image
              v-for="(image, index) in JSON.parse(moment.images)"
              :key="index"
              :src="image"
              mode="scaleToFill"
              class="img"
              @click="preview(image, JSON.parse(moment.images))"
            />
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Moment } from "@/types/Moment.ts";
import { getMomentListAPI } from "@/api/getMomentListAPI";
import { watch } from "vue";
import { getBannerListAPI } from "@/api/getBannerList";
import { Banner } from "@/types/Banner";
import { onLoad } from "@dcloudio/uni-app";

const bannerList = ref<Banner[]>();
onLoad(() => {
  getBannerListAPI().then((res) => {
    bannerList.value = res;
  });
});

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

const preview = (cur: string, img: string[]) => {
  uni.previewImage({
    urls: img,
    current: cur,
  });
};
</script>

<style scoped>
.container {
  width: 312px;
  height: 580px;
}
.banner {
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 160px;
  width: 100%;
}
scroll-view::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
.banner_img {
  width: 100%;
  height: 100%;
}
.moment {
  width: 312px;
  border-bottom: 1px solid #70707080;
}
.moment_container {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
}
.avatar {
  width: 30px;
  height: 30px;
}
.avatar_img {
  width: 100%;
  height: 100%;
}
.text {
  margin-left: 10px;
}
.user_name {
  font-weight: bold;
}
.content {
  margin-top: 10px;
}
.image_container {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-gap: 5px;
  margin-top: 5px;
}
.img {
  width: 80px;
  height: 80px;
}
</style>
