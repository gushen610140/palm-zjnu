import { http } from "@/utils/http";

export const putMomentLikesAPI = (
  momentId:string,
  userId:string,
) => {
  return http<string>({
    url: "/api/moments/likes/add",
    method: "PUT",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      momentId,
      userId,
    },
  })
};