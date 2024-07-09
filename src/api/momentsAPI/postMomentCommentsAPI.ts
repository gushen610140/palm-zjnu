import { http } from "@/utils/http";
import type { Comment } from "@/types/Comment";
import type { Moment } from "@/types/Moment";

export const postMomentCommentsAPI = (comment: Comment) => {
  return http<Moment>({
    url: "/api/moments/comments/add",
    method: "POST",
    data: comment
  })
}