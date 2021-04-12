//reducer.js
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构
import {
  CHANGE_BANNER_Action,
  CHANGE_RECOMMEND_LIST_Action,
  CHANGE_RECOMMEND_Loading_Action
} from './type'

type RECOMMEND_ACTION = CHANGE_BANNER_Action | CHANGE_RECOMMEND_LIST_Action | CHANGE_RECOMMEND_Loading_Action

const defaultState = fromJS ({
  bannerList: [],
  recommendList: [],
  enterLoading: true
});

export default (state = defaultState, action: RECOMMEND_ACTION) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    default:
      return state;
  }
}