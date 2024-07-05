import { http } from "@/utils/http";
import type { User } from "@/types/User";

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