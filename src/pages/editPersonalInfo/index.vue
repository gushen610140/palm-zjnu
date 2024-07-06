<template>
  <view class="container">
    <view class="avatar box">
      <view class="text">头像</view>
      <image src="" mode="scaleToFill" />
    </view>
    <view class="name box">
      <view class="text">昵称</view>
    </view>
    <view class="student_number box">
      <view class="text">学号</view>
    </view>
    <view class="wechat box">
      <view class="text">微信号</view>
    </view>
    <view class="gender box">
      <view class="text">性别</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { User } from "@/types/User";

const userInfo = ref<User>({});
</script>

<style scoped>
.box {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #70707080;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.text {
  margin-left: 10px;
}
</style>
