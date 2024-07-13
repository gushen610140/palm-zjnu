<template>
  <view class="searchbar">
    <input
      type="text"
      class="search_content"
      :value="search_content"
      placeholder="搜索你想要的功能"
    />
    <image class="search" src="@/static/search_icon.png"></image>
  </view>
  <view class="titlebox">
    <text class="title title1">最多跑一次？</text>
    <text class="title title2">一次不用跑！</text>
  </view>
  <view class="function_container">
    <view class="function_box">
      <view class="function_title"> 成绩查询 </view>
      <view class="function_intro"> 查看您的期末成绩 </view>
      <image src="@/static/enter_circle.png" mode="scaleToFill" class="enter" />
    </view>
    <view class="function_box">
      <view class="function_title"> 课表查询 </view>
      <view class="function_intro"> 查询您的学年课表 </view>
      <image src="@/static/enter_circle.png" mode="scaleToFill" class="enter" />
    </view>
    <view class="function_box">
      <view class="function_title"> 寝室电费 </view>
      <view class="function_intro"> 管理您的寝室电费 </view>
      <image src="@/static/enter_circle.png" mode="scaleToFill" class="enter" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const search_content = ref("");
</script>

<style scoped>
.searchbar {
  height: 90rpx;
  width: 85%;
  box-shadow: 0 0 1px #303030;
  margin: 0 auto;
  margin-top: 25rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
}
.search_content {
  padding-left: 25rpx;
  font-size: 16px;
  color: #303030;
  height: 90rpx;
  line-height: 90rpx;
  width: 85%;
}
.search {
  width: 30px;
  height: 30px;
}
.titlebox {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 5px;
}
.title {
  display: block;
  font-size: 28px;
  font-family:
    Impact,
    Haettenschweiler,
    ‘Arial Narrow Bold’,
    sans-serif;
}
.title1 {
  color: #30303020;
}
.title2 {
  color: #608e63;
  margin-top: 10px;
}
.function_container {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.function_box {
  width: 90%;
  height: 120px;
  margin: 0 auto;
  margin-bottom: 10px;
  box-shadow: 0 0 3px #30303080;
  border-radius: 5px;
}
.function_title {
  font-size: 24px;
  font-weight: bold;
  color: #303030;
  margin-left: 10px;
  margin-top: 10px;
}
.function_intro {
  font-size: 14px;
  color: #707070;
  margin-left: 10px;
  margin-top: 5px;
}
.enter {
  width: 30px;
  height: 30px;
  margin-top: 10%;
  margin-left: 75%;
  box-shadow: 0 0 5px #30303080;
  border-radius: 15px;
}
</style>
