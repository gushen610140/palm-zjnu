import { http } from "@/utils/http";
import { User } from "@/types/User";
import { Token } from "@/types/Token";

export const userLogin = (openid: string, sessionKey: string) => {
  const token: Token = {
    openid,
    sessionKey,
  }
  return http<User>({
    url: "/api/user/login",
    method: "POST",
    data: {
      ...token,
    },
  })
};