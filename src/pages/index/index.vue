<template>
  <view class="content">
    <img src="@/static/logo.png" alt="logo" class="logo">
    <text class="title">{{ title }}</text>
  </view>
  <button
    open-type=""
    hover-class="button-hover"
    @click="getData"
  >
    111
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { http } from '@/utils/http'
const title = ref('欢迎来到掌上浙师大')

const getData = async () => {
  const res = await http({
    url: '/projects',
    method: 'GET'
  })
  console.log(res)
}

</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
}

.title {
  font-size: 36rpx;
}
</style>
