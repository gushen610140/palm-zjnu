import { defineStore } from "pinia"
import { ref } from "vue"
import Message from "@/types/message"

export const useMessageStore = defineStore(
  'message',
  () => {
    const message = ref<Message>()

    const setMessage = (newMessage: Message) => {
      message.value = newMessage
    }

    const clearMessage = () => {
      message.value = undefined
    }
  }

  return {
    message,
    setMessage,
    clearMessage
  },
  {
    persist: true
  }
)