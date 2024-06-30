import type { Banner } from "@/types/Banner"
import { http } from "@/utils/http"


export const getBannerListAPI = () => {
  return http<Banner[]>({
    url: '/api/banners',
    method: 'GET',
  })
}