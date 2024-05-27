<template>
  <view class="body">
    <view class="discussion" v-for="discussion in discussionList">

    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const discussionList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
</script>

<style scoped>
.body {
  width: 312px;
  display: flex;
  flex-direction: column;
  border: 1px solid #707070;
}
.discussion {
  height: 88px;
  width: 312px;
  border: 1px solid #707070;
  margin: 8px 0;
}
</style>