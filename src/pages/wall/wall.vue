<template>
  <uni-section title="讨论区" type="line" class="title"></uni-section>
    <uni-card v-for="message in messages" :key="message.id"
      :title="message.title" 
      :thumbnail="message.img"
    >
      <text class="uni-body">{{ message.content }}</text>
    </uni-card>
</template>

<script lang="ts" setup>
import Message from '@/types/message'

const messages: Message[] = [
  {
    id: '1',
    title: '感觉用这个uni的组件比element更轻松啊',
    content: '这个项目上线也是可以慢慢来好吧',
    img: '/static/wall-messages-image/1.png'
  }, 
  {
    id: '2',
    title: '感觉微信小程序访问我的api肯定很难',
    content: '真是搞这么安全干什么',
    img: 'https://i0.hippopx.com/photos/683/318/324/wolf-wolves-snow-wolf-landscape-preview.jpg'
  }
]

</script>

<style scoped>

.title {
  font-size: 10rem;
}

</style>