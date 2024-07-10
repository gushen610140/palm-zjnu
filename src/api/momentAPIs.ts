import { http } from "@/utils/http";
import type { Comment, Moment } from "@/types/model";

export const postMomentAPI = (
  userId:string, 
  userName:string, 
  userAvatar:string, 
  date:string, 
  content:string,
  images: string,
  likes: string,
  comments: string
) => {
  return http<null>({
    url: "/api/moment",
    method: "POST",
    data: {
      userId,
      userName,
      userAvatar,
      date,
      content,
      images,
      likes,
      comments
    },
  })
};

export const postMomentCommentsAPI = (comment: Comment) => {
  return http<Moment>({
    url: "/api/moment/comments",
    method: "PUT",
    data: comment
  })
};

export const putMomentLikesAPI = (
  momentId:string,
  userId:string,
) => {
  return http<string>({
    url: "/api/moment/likes",
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

export const getMomentsAPI = (current: number, size: number) => {
  return http<Moment[]>({
    url: "/api/moments",
    method: "GET",
    data: {
      current,
      size
    },
  })
};