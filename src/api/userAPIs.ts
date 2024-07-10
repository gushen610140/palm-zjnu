import type { User } from "@/types/User"
import { http } from "@/utils/http"

export const putUserAPI =  async (updatedUser: User) => {
  return http<User>({
    url: '/api/user',
    method: 'PUT',
    data: {
      ...updatedUser
    }
  })
}

export const getUserInfoAPI = (token: Token) => {
  return http<User>({
    url: '/api/user/info',
    method: 'GET',
    data: {
      ...token,
    }
  })
}

export const postUserLoginAPI = (openid: string, sessionKey: string) => {
  return http<User>({
    url: "/api/user/login",
    method: "POST",
    data: {
      openid,
      sessionKey
    },
  })
};