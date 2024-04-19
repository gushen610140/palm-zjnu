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

interface Message {
  id: string
  title: string
  content: string
  img: string
}

const messages: Message[] = [
  {
    id: '1',
    title: '感觉用这个uni的组件比element更轻松啊',
    content: '这个项目上线也是可以慢慢来好吧',
    img: 'https://img.yzcdn.cn/vant/cat.jpeg'
  }, 
  {
    id: '2',
    title: '感觉微信小程序访问我的api肯定很难',
    content: '真是搞这么安全干什么',
    img: 'https://img.yzcdn.cn/vant/cat.jpeg'
  }
]

</script>

<style scoped>

.title {
  font-size: 10rem;
}

</style>