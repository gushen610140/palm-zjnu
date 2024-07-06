<template>
  <view class="myinfo">
    <view class="avatar">
      <image class="avatar_img" :src="userInfo.userAvatar" mode="scaleToFill" />
    </view>
    <view class="text">
      <view class="name"> {{ userInfo.userName }} </view>
      <view class="code"> {{ userInfo.userId }} </view>
    </view>
  </view>
  <view class="functions">
    <button class="edit" @click="editUserInfo">编辑个人资料</button>
  </view>
  <uni-popup ref="popup" type="center">
    <uni-popup-dialog
      type="info"
      mode="base"
      content="初次登录，需要获取您的微信头像和名称"
      @confirm="getUserInfo"
    />
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
import { postUserLoginAPI } from "@/api/postUserLoginAPI";
import { Token } from "@/types/Token";
import { User } from "@/types/User";
import { getUserInfoAPI } from "@/api/getUserInfoAPI";
import { Result } from "@/types/Result";
import { getTokenFromWechatAPI } from "@/api/getTokenFromWechatAPI";
import { updateUserAvatarAPI } from "@/api/updateUserAvatarAPI";
import { updateUserNameAPI } from "@/api/updateUserNameAPI";

const userInfo = ref<User>({
  userId: "0000000",
  userName: "游客",
  userAvatar: "http://127.0.0.1:8080/api/images/avatars/default.png",
});
const popup = ref();

onReady(() => {
  uni.getStorage({
    key: "token",
    // 用户已经登录
    success: (userTokenRes) => {
      getUserInfoAPI(userTokenRes.data).then((userInfoRes: Result<User>) => {
        userInfo.value = userInfoRes.data;
      });
    },
    // 用户没有登录
    fail: () => {
      uni.login({
        provider: "weixin",
        onlyAuthorize: true,
        // 微信授权登录成功
        success: (wechatLoginCodeRes) => {
          getTokenFromWechatAPI(wechatLoginCodeRes.code).then(
            // 注意这里返回的类型不是来自DevServer，而是来自微信服务器，不听取http定义的类型
            (wechatTokenRes) => {
              postUserLoginAPI(
                wechatTokenRes.openid,
                wechatTokenRes.session_key
              ).then((userRes) => {
                // 新注册的用户，弹窗尝试获取用户信息
                if (userRes.code == 201) {
                  popup.value.open();
                }
                userInfo.value = userRes.data;
                uni.setStorage({
                  key: "token",
                  data: wechatTokenRes,
                });
                uni.showToast({
                  title: "登录成功",
                });
              });
            }
          );
        },
        // 微信授权失败
        fail: () => {
          uni.showToast({
            title: "微信授权失败，请稍后再试",
          });
        },
      });
    },
    // TODO 用户session过期的情况处理
  });
});

const getUserInfo = () => {
  uni.getUserProfile({
    desc: "for user info",
    // 成功获取到用户信息
    success: (success) => {
      userInfo.value.userName = success.userInfo.nickName;
      userInfo.value.userAvatar = success.userInfo.avatarUrl;
      updateUserAvatarAPI(userInfo.value);
      updateUserNameAPI(userInfo.value);
      uni.showToast({
        title: "用户授权成功",
      });
    },
    // 用户拒绝授权
    fail: (fail) => {
      uni.showToast({
        title: "用户拒绝授权访问，使用默认信息",
      });
    },
  });
};

const editUserInfo = () => {
  uni.navigateTo({
    url: "/pages/editPersonalInfo/index",
  });
};
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
@/api/postUserLogin
