import type { User } from "@/types/User"
import { http } from "@/utils/http"

export const updateUserAvatarAPI =  async (updatedUser: User) => {
  return http<string>({
    url: '/api/user/avatar',
    method: 'PUT',
    data: {
      ...updatedUser
    }
  })
}