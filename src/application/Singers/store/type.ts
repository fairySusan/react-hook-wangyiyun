import {CHANGE_SINGER_LIST} from './constants'
export interface CHANGE_BANNER_Action {
  type: typeof CHANGE_SINGER_LIST,
  data: {imageUrl: string}[]
}