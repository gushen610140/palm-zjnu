<template>
  <view class="container">
    <view class="avatar box">
      <view class="text">头像</view>
      <view class="fill"></view>
      <image :src="userInfo.userAvatar" mode="scaleToFill" class="avatar_img" />
      <image src="@/static/enter.png" mode="scaleToFill" class="enter_img" />
    </view>
    <view class="name box" @click="editName">
      <view class="text">昵称</view>
      <view class="fill"></view>
      <view class="name_text content_text">{{ userInfo.userName }}</view>
      <image src="@/static/enter.png" mode="scaleToFill" class="enter_img" />
    </view>
    <view class="student_number box" @click="editStudentNumber">
      <view class="text">学号</view>
      <view class="fill"></view>
      <view class="student_number_text content_text">{{
        userInfo.userStudentNumber
      }}</view>
      <image src="@/static/enter.png" mode="scaleToFill" class="enter_img" />
    </view>
    <view class="wechat box" @click="editWechatNumber">
      <view class="text">微信号</view>
      <view class="fill"></view>
      <view class="wechat_number_text content_text">{{
        userInfo.wechatNumber
      }}</view>
      <image src="@/static/enter.png" mode="scaleToFill" class="enter_img" />
    </view>
    <view class="gender box" @click="editGender">
      <view class="text">性别</view>
      <view class="fill"></view>
      <view class="gender_text content_text">{{ userInfo.gender }}</view>
      <image src="@/static/enter.png" mode="scaleToFill" class="enter_img" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { User } from "@/types/User";
import { getUserInfoAPI } from "@/api/getUserInfoAPI";
import { onShow } from "@dcloudio/uni-app";

const userInfo = ref<User>({});

onShow(() => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    userInfo.value = UserInfoRes.data;
  });
});

const editName = () => {
  uni.navigateTo({
    url: "/pages/editUserName/index",
  });
};

const editStudentNumber = () => {
  uni.navigateTo({
    url: "/pages/editSingleUserInfoPages/editStudentNumber",
  });
};

const editWechatNumber = () => {
  uni.navigateTo({
    url: "/pages/editSingleUserInfoPages/editWechatNumber",
  });
};

const editGender = () => {
  uni.navigateTo({
    url: "/pages/editSingleUserInfoPages/editGender",
  });
};
</script>

<style scoped>
.box {
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #70707080;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fill {
  flex: 1;
}
.text {
  margin-left: 10px;
}
.avatar {
  height: 80px;
}
.avatar_img {
  width: 50px;
  height: 50px;
}
.enter_img {
  width: 16px;
  height: 16px;
  margin-left: 10px;
}
.content_text {
  color: #707070;
}
</style>
