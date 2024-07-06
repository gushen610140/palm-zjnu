import { http } from "@/utils/http";

export const getMomentListAPI = (current: number, size: number) => {
  return http<Moment[]>({
    url: "/api/moments",
    method: "GET",
    data: {
      current,
      size
    },
  })
};