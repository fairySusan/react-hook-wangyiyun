import {CHANGE_BANNER, CHANGE_RECOMMEND_LIST} from './constants'

export interface CHANGE_BANNER_Action {
  type: typeof CHANGE_BANNER,
  data: any
}

export interface CHANGE_RECOMMEND_LIST_Action {
  type: typeof CHANGE_RECOMMEND_LIST,
  data: any
}