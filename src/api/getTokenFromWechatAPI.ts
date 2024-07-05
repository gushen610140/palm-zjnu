import type { Token } from "@/types/Token";
import { http } from "@/utils/http";

export const getTokenFromWechatAPI = async (code: string) => {
  return http<Token>({
    url: "https://api.weixin.qq.com/sns/jscode2session",
    method: "GET",
    data: {
      appid: "wx622113ff58e2b46b",
      secret: "360464608fc569e5867a35e4cf5bb309",
      js_code: code,
      grant_type: "authorization_code",
    },
  })
}