export interface BaseResponse<T> {
  data: T
}

export interface BannerI {
  banners: {
    imageUrl: string
  }[]
}

export interface RecommendItemI {
  copywriter: string,
  id: number,
  name: string,
  picUrl: string,
  playCount: number,
  trackCount: number,
  trackNumberUpdateTime: number
}

export interface RecommendRes {
  result: RecommendItemI[]
}