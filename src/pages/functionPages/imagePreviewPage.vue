<template>
  <image :src="imgUrl" mode="aspectFit" class="img" @click="handleClick" />
  <button class="delete" type="warn" @click="handleDelete">删除图片</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const imgUrl = ref<string>("");

onLoad((options) => {
  imgUrl.value = options.img;
});

const handleClick = () => {
  uni.previewImage({
    urls: [imgUrl.value],
  });
};

const handleDelete = () => {
  uni.$emit("deleteImage", {
    img: imgUrl.value,
  });
  uni.navigateBack();
};
</script>

<style scoped>
.img {
  width: 100%;
  height: 600px;
  margin-top: 20px;
}
.delete {
  margin-top: 20px;
}
</style>
