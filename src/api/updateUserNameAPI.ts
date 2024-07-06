import type { User } from "@/types/User"
import { http } from "@/utils/http"

export const updateUserNameAPI =  async (updatedUser: User) => {
  return http<string>({
    url: '/api/user/name',
    method: 'PUT',
    data: {
      ...updatedUser
    }
  })
}