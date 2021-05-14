import {
  getSingerListRequest
} from "../../../api/request";
import {
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING
} from './constants';
import {
  fromJS
} from 'immutable';
import { Dispatch } from 'redux'


const changeSingerList = (data: any) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});

export const changePageCount = (data: any) => ({
  type: CHANGE_PAGE_COUNT,
  data
});

//进场loading
export const changeEnterLoading = (data: any) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

//滑动最底部loading
export const changePullUpLoading = (data: any) => ({
  type: CHANGE_PULLUP_LOADING,
  data
});

//顶部下拉刷新loading
export const changePullDownLoading = (data: any) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
});

//加载歌手列表
export const getSingerList = (count: number, category?: any, alpha?: string) => {
  return (dispatch: Dispatch) => {
    getSingerListRequest(count,category, alpha).then((res: any) => {
      const data = res.data.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullUpLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    })
  }
};