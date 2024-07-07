import type { User } from "@/types/User"
import { http } from "@/utils/http"

export const updateUserWechatNumberAPI =  async (updatedUser: User) => {
  return http<string>({
    url: '/api/user/wechat_number',
    method: 'PUT',
    data: {
      ...updatedUser
    }
  })
}