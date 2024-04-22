<template>
  <view class="content">
    <img src="@/static/logo.png" alt="logo" class="logo">
    <text class="title">{{ title }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('欢迎加入掌上浙师大')
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 80%;
}

.title {
  font-size: 36rpx;
}
</style>
