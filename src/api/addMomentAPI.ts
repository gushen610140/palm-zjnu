import { http } from "@/utils/http";

export const addMomentAPI = (
  userId:string, 
  userName:string, 
  userAvatar:string, 
  date:string, 
  content:string,
  images: string
) => {
  return http<null>({
    url: "/api/moments",
    method: "POST",
    data: {
      userId,
      userName,
      userAvatar,
      date,
      content,
      images
    },
  })
};