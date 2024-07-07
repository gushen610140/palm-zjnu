import type { User } from "@/types/User"
import { http } from "@/utils/http"

export const updateUserStudentNumberAPI =  async (updatedUser: User) => {
  return http<string>({
    url: '/api/user/student_number',
    method: 'PUT',
    data: {
      ...updatedUser
    }
  })
}