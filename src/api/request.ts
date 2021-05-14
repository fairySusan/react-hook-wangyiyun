import { axiosInstance } from "./config";
export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}

export const getHotSingerListRequest = (count: number) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (count: number, category?: any, alpha?: string) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha?.toLowerCase()}&offset=${count}`);
}