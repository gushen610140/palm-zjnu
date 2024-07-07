<template>
  <input
    v-model="updatedGender"
    placeholder="性别不只可以填男女哦！"
    placeholder-class="input-placeholder"
    class="input_box"
  />
  <button @click="updateGender" class="button">保存</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { updateUserGenderAPI } from "@/api/updateUserGenderAPI";
import { getUserInfoAPI } from "@/api/getUserInfoAPI";
import { onShow } from "@dcloudio/uni-app";

const updatedGender = ref("");

onShow(() => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    updatedGender.value = userInfo.gender;
  });
});

const updateGender = () => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    userInfo.gender = updatedGender.value;
    updateUserGenderAPI(userInfo).then(() => {
      uni.showToast({
        title: "性别修改成功",
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
