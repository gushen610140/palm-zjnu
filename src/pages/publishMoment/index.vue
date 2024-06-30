<template>
  <textarea class="textarea" placeholder="这一刻的想法..." v-model="content">
  </textarea>
  <view class="publish_container">
    <button
      size="mini"
      class="anonymous_publish button"
      @click="handleAnonymousPublish"
    >
      匿名发布
    </button>
    <button size="mini" class="publish button" @click="handlePublish">
      发布
    </button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { addMomentAPI } from "@/api/addMoment.ts";
import { generateUUID } from "@/utils/generateUUID.ts";

const content = ref("");

const handlePublish = () => {
  addMomentAPI(
    generateUUID(),
    "gushen",
    "http://lkfjdkfjsldf/sdfkjl.jpg",
    new Date(),
    content.value
  );
};

const handleAnonymousPublish = () => {};
</script>

<style scoped>
.textarea {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  border-bottom: 1px #70707080 solid;
}
.publish_container {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
}
.button {
  width: 100px;
  border: #70707080 1px solid;
}
</style>
