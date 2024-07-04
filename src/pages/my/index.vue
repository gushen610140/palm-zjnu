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
    <button class="edit">编辑个人资料</button>
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
import { onLoad, onReady } from "@dcloudio/uni-app";
import { userLogin } from "@/api/userLogin";
import { Token } from "@/types/Token";
import { User } from "@/types/User";
import { getUserInfoAPI } from "@/api/getUserInfoAPI";

const userInfo = ref<User>({
  userId: "0000000",
  userName: "游客",
  userAvatar: "http://127.0.0.1:8080/api/images/avatars/default.png",
});
const popup = ref();

onReady(() => {
  // 检查用户是否已经登录
  uni.getStorage({
    key: "token",
    // 用户已经登录
    success: (userTokenRes) => {
      getUserInfoAPI(userTokenRes.data).then((userInfoRes) => {
        userInfo.value = userInfoRes.data;
      });
    },
    // 用户登录无效
    fail: (res) => {
      // 尝试利用微信授权用户登录
      uni.login({
        provider: "weixin",
        onlyAuthorize: true,
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
            // 向开发者服务器登录
            success: (wxToken) => {
              userLogin(wxToken.data.openid, wxToken.data.session_key).then(
                (res) => {
                  if (res.code == 201) {
                    // 新注册的用户，弹窗尝试获取用户信息
                    popup.value.open();
                  }
                  userInfo.value = res.data;
                  uni.setStorage({
                    key: "token",
                    data: wxToken.data,
                  });
                }
              );
            },
            // 微信授权失败
            fail: (fail) => {
              // ...todo 处理微信授权失败
              console.log(fail);
            },
          });
        },
        // 用户授权失败
        fail: function (err) {
          // ...todo 处理用户授权失败
          console.log(err);
        },
      });
    },
  });
});

const getUserInfo = () => {
  uni.getUserProfile({
    desc: "for user info",
    // 成功获取到用户信息
    success: (success) => {
      console.log(success);
      userInfo.value.userName = success.userInfo.nickName;
      userInfo.value.userAvatar = success.userInfo.avatarUrl;
    },
    // 用户拒绝授权 使用默认信息
    fail: (fail) => {
      // ...todo 处理用户拒绝授权
      console.log(fail);
    },
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
