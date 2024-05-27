<template>
  <view class="search">
    <img src="@/static/search_icon.png" alt="search" class="search-icon" />
  </view>
  <view class="banner">
    <view class="banner-img">

    </view>
    <view class="banner-title">
      banner_title 大图标题
    </view>
  </view>
  <view class="discussion">
    <DiscussionList/>
  </view>
</template>

<script setup lang="ts">
import DiscussionList from "@/components/DiscussionList.vue"

</script>

<style scoped>
.search {
  height: 32px;
  width: 328px;
  border: 1px solid #707070;
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 16px;
  display: flex;
  align-items: center;
}
.search-icon {
  height: 21px;
  width: 21px;
  margin-left: 10px;
}
.banner {
  height: 216px;
  width: 312px;
  border: 1px solid #707070;
  margin: 0 auto;
  margin-top: 24px;
}
.banner-img {
  margin: 0 auto;
  margin-top: 24px;
  height: 136px;
  width: 280px;
  border: 1px solid #707070;
}
.banner-title {
  margin-top: 8px;
  margin-left: 24px;
  height: 32px;
  width: 264px;
  font-family: "HarmonyOS_Sans_SC_Black";
  font-size: 24px;
  font-weight: bold;
  color: #707070;
}
.discussion {
  margin: 0 auto;
  margin-top: 32px;
  width: 312px;
}
</style>
