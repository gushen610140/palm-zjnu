<template>
  <view class="publish_container">
    <image class="avatar" :src="userInfo.userAvatar"></image>
    <view style="flex: 1"></view>
    <button
      size="mini"
      class="publish button"
      type="primary"
      @click="handlePublish"
    >
      发表
    </button>
  </view>
  <textarea class="textarea" placeholder="这一刻的想法..." v-model="content">
  </textarea>
  <view class="image_container">
    <image
      class="specific"
      v-for="(img, index) in imageList"
      :key="index"
      :src="img"
      @click="handlePreviewImage(img)"
    ></image>
    <image
      class="add"
      src="@/static/add_image.png"
      @click="handleAddImage"
      v-if="!isFull"
    ></image>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { addMomentAPI } from "@/api/addMomentAPI.ts";
import { generateUUID } from "@/utils/generateUUID.ts";
import { getUserInfoAPI } from "@/api/getUserInfoAPI";
import { onShow } from "@dcloudio/uni-app";
import type { User } from "@/types/User";
import { path } from "@/utils/path";

const userInfo = ref<User>({});

onShow(() => {
  getUserInfoAPI(uni.getStorageSync("token")).then((userInfoRes) => {
    userInfo.value = userInfoRes.data;
  });
});

const content = ref<string>("");

const handlePublish = () => {
  if (content.value == "") {
    uni.showToast({
      title: "内容不能为空",
      icon: "error",
    });
  } else {
    const token = uni.getStorageSync("token");
    if (!token) {
      uni.showToast({
        title: "您尚未登录，正在为您跳转至登录页面",
        icon: "none",
      });
      setTimeout(() => {
        uni.switchTab({
          url: "/pages/my/index",
        });
      }, 1500);
    } else {
      getUserInfoAPI(uni.getStorageSync("token")).then((userInfo) => {
        addMomentAPI(
          userInfo.data.userId,
          userInfo.data.userName,
          userInfo.data.userAvatar,
          new Date(),
          content.value
        ).then(() => {
          uni.navigateBack();
        });
      });
    }
  }
};

const imageList = ref<string[]>([]);
const isFull = ref<boolean>(false);

const handleAddImage = () => {
  if (imageList.value.length >= 9) {
    uni.showToast({
      title: "最多只能上传9张图片",
      icon: "none",
    });
  } else {
    uni.chooseImage({
      success: (chooseImageRes) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        uni.uploadFile({
          url: `${path.imagePath}/upload`,
          filePath: tempFilePaths[0],
          name: "file",
          success: (uploadFileRes) => {
            const fileName = JSON.parse(uploadFileRes.data).data;
            imageList.value.push(`${path.imagePath}/${fileName}`);
            if (imageList.value.length >= 9) {
              isFull.value = true;
            }
          },
        });
      },
    });
  }
};

const handlePreviewImage = (img: string) => {
  uni.previewImage({
    urls: [img],
  });
};
</script>

<style scoped>
.textarea {
  width: 80%;
  margin: 0 auto;
  margin-top: 25px;
  border-bottom: 1px #70707080 solid;
}
.publish_container {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.button {
  margin: 0;
  padding: 0;
  width: 60px;
  border: #70707080 1px solid;
  margin-right: 30px;
}
.avatar {
  margin-left: 30px;
  width: 35px;
  height: 35px;
  border-radius: 5px;
}
.image_container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-gap: 5px;
  width: 310px;
  margin: 0 auto;
  margin-top: 20px;
}
.add {
  width: 100%;
  height: 100%;
}
.specific {
  width: 100%;
  height: 100%;
}
</style>
