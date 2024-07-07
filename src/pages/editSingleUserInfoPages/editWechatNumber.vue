<template>
  <input
    v-model="updatedWechatNumber"
    placeholder="您的微信号将作为联系您的方式"
    placeholder-class="input-placeholder"
    class="input_box"
  />
  <button @click="updateWechatNumber" class="button">保存</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { updateWechatNumberAPI } from "@/api/updateWechatNumberAPI";
import { getUserInfoAPI } from "@/api/getUserInfoAPI";
import { onShow } from "@dcloudio/uni-app";

const updatedWechatNumber = ref("");

onShow(() => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    updatedWechatNumber.value = userInfo.wechatNumber;
  });
});

const updateWechatNumber = () => {
  getUserInfoAPI(uni.getStorageSync("token")).then((UserInfoRes) => {
    const userInfo = UserInfoRes.data;
    userInfo.wechatNumber = updatedWechatNumber.value;
    updateWechatNumberAPI(userInfo).then(() => {
      uni.showToast({
        title: "微信号修改成功",
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
