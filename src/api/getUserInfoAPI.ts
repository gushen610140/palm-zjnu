import type { Token } from "@/types/Token";
import type { User } from "@/types/User";
import { http } from "@/utils/http";

export const getUserInfoAPI = (token: Token) => {
  return http<User>({
    url: '/api/user/info',
    method: 'POST',
    data: {
      ...token,
    }
  })
}