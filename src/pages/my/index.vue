<template>
  <view class="myinfo">
    <view class="avatar">
      <image class="avatar_img" :src="userInfo.avatarUrl" mode="scaleToFill" />
    </view>
    <view class="text">
      <view class="name"> {{ userInfo.nickName }} </view>
      <view class="code"> 学号 </view>
    </view>
  </view>
  <button
    :disabled="false"
    :loading="false"
    hover-class="button-hover"
    @click="test"
  >
    click
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const userInfo = ref({});
const test = () => {
  uni.login({
    provider: "weixin",
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      uni.request({
        url: "https://api.weixin.qq.com/sns/jscode2session",
        method: "GET",
        data: {
          appid: "wx622113ff58e2b46b",
          secret: "360464608fc569e5867a35e4cf5bb309",
          js_code: event.code,
          grant_type: "authorization_code",
        },
        success: (res) => {
          //获得token完成登录
          console.log(res);
        },
      });
    },
    fail: function (err) {
      // 登录授权失败
      // err.code是错误码
      console.log(err);
    },
  });
};

onLoad(() => {
  uni.getUserInfo({
    provider: "weixin",
    success: (res) => {
      userInfo.value = res.userInfo;
    },
  });
});
</script>

<style scoped>
.myinfo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 150px;
  width: 100%;
  border-bottom: 1px solid #70707080;
}
.avatar {
  margin-left: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar_img {
  height: 80px;
  width: 80px;
}
.text {
  margin-left: 20px;
}
</style>
