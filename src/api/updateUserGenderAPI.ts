import type { User } from "@/types/User"
import { http } from "@/utils/http"

export const updateUserGenderAPI =  async (updatedUser: User) => {
  return http<string>({
    url: '/api/user/gender',
    method: 'PUT',
    data: {
      ...updatedUser
    }
  })
}