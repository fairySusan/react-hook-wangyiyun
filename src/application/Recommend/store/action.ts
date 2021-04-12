import * as actionTypes from './constants';
import { Dispatch } from 'redux'
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from 'src/api/request';
import { BaseResponse, BannerI, RecommendRes, RecommendItemI } from 'src/api/type'
import { AxiosResponse } from 'axios'

export const setBannerList = (data: {imageUrl: string}[]) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS (data)
});

export const setRecommendList = (data: RecommendItemI[]) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS (data)
});

export const setEnterLoading = (data: boolean) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => {
  return (dispatch: Dispatch) => {
    getBannerRequest().then((res: AxiosResponse<BannerI>) => {
      dispatch(setBannerList(res.data.banners));
    }).catch (() => {
      console.log ("轮播图数据传输错误");
    }) 
  }
};

export const getRecommendList = () => {
  return (dispatch: Dispatch) => {
    getRecommendListRequest().then ((res: BaseResponse<RecommendRes>) => {
      dispatch(setRecommendList(res.data.result));
      dispatch(setEnterLoading(false))
    }).catch(() => {
      console.log ("推荐歌单数据传输错误");
    });
  }
};