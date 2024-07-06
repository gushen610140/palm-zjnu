<template>
  <input
    v-model="updatedUserName"
    placeholder="不允许使用空白昵称"
    placeholder-class="input-placeholder"
    class="input_box"
  />
  <button @click="updateUserName" class="button">保存</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { updateUserNameAPI } from "@/api/updateUserNameAPI";
import { getUserInfoAPI } from "@/api/getUserInfoAPI";
import { onShow } from "@dcloudio/uni-app";

const updatedUserName = ref("");

onShow(() => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    updatedUserName.value = userInfo.userName;
  });
});

const updateUserName = () => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    userInfo.userName = updatedUserName.value;
    updateUserNameAPI(userInfo).then(() => {
      uni.showToast({
        title: "昵称修改成功",
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
