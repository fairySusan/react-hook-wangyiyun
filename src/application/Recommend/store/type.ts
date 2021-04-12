import {CHANGE_BANNER, CHANGE_RECOMMEND_LIST, CHANGE_ENTER_LOADING} from './constants'
import { BannerI, RecommendItemI } from 'src/api/type'

export interface CHANGE_BANNER_Action {
  type: typeof CHANGE_BANNER,
  data: {imageUrl: string}[]
}

export interface CHANGE_RECOMMEND_LIST_Action {
  type: typeof CHANGE_RECOMMEND_LIST,
  data: RecommendItemI[]
}

export interface CHANGE_RECOMMEND_Loading_Action {
  type: typeof CHANGE_ENTER_LOADING
  data: boolean
}