<template>
  <view class="myinfo">
    <view class="avatar">
      <image class="avatar_img" :src="userInfo.userAvatar" mode="scaleToFill" />
    </view>
    <view class="text">
      <view class="name"> {{ userInfo.userName }} </view>
      <view class="code"> {{ userInfo.userId }} </view>
    </view>
    <button
      :disabled="false"
      :loading="false"
      hover-class="button-hover"
      @click="login"
    >
      点击登录
    </button>
  </view>
  <view class="functions">
    <button class="edit">编辑个人资料</button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { userLogin } from "@/api/userLogin";
import { Token } from "@/types/Token";
import { User } from "@/types/User";

const userInfo = ref<User>({});
const login = () => {
  uni.login({
    provider: "weixin",
    onlyAuthorize: true, // 微信登录仅请求授权认证
    success: function (event) {
      // 从微信官方服务器获取token
      uni.request({
        url: "https://api.weixin.qq.com/sns/jscode2session",
        method: "GET",
        data: {
          appid: "wx622113ff58e2b46b",
          secret: "360464608fc569e5867a35e4cf5bb309",
          js_code: event.code,
          grant_type: "authorization_code",
        },
        // 向服务器登录
        success: (res) => {
          userLogin(res.data.openid, res.data.session_key).then((res) => {
            console.log(res);
            userInfo.value = res.data;
          });
        },
        fail: (fail) => {
          console.log(fail);
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
      console.log(res);
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
.name {
  font-size: 20px;
  font-weight: bold;
}
.code {
  font-size: 14px;
  font-weight: lighter;
  margin-top: 5px;
}
.functions {
  margin-top: 20px;
}
</style>
