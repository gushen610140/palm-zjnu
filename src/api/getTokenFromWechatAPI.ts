import type { Token } from "@/types/Token";
import { http } from "@/utils/http";

export const getTokenFromWechatAPI = async (code: string) => {
  const res = await http<string>({
    url: "/api/secret",
    method: "GET",
  });
  const [appid, secret] = res.data.split(",")
  return http<Token>({
    url: "https://api.weixin.qq.com/sns/jscode2session",
    method: "GET",
    data: {
      appid,
      secret,
      js_code: code,
      grant_type: "authorization_code",
    },
  })
}