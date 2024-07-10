<template>
  <input
    v-model="updatedStudentNumber"
    placeholder="请填写真实的学号"
    placeholder-class="input-placeholder"
    class="input_box"
  />
  <button @click="updateStudentNumber" class="button">保存</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { putUserAPI, getUserInfoAPI } from "@/api/userAPIs";

const updatedStudentNumber = ref("");

onShow(() => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    updatedStudentNumber.value = userInfo.userStudentNumber;
  });
});

const updateStudentNumber = () => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    userInfo.userStudentNumber = updatedStudentNumber.value;
    putUserAPI(userInfo).then(() => {
      uni.showToast({
        title: "学号修改成功",
        icon: "success",
      });
      uni.navigateBack();
    });
  });
};
</script>

<style scoped>
.input_box {
  height: 60px;
  width: 90%;
  margin: 0 auto;
}
.button {
  margin-top: 10px;
  width: 90%;
  margin: 0 auto;
}
</style>
