import { Dispatch } from 'redux'
import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getRankListRequest } from 'src/api/request';
import { AxiosResponse } from 'axios'

export const setRankList = (data: any) => ({
    type: actionTypes.SET_RANK_LIST,
    data
})

export const setEnterLoading = (data: boolean) => ({
    type: actionTypes.SET_ENTER_LOADING,
    data
})

export const getRankList = () => {
    return (dispatch: Dispatch) => {
        dispatch(setEnterLoading(true))
        getRankListRequest().then((res: AxiosResponse<any>) => {
            dispatch(setRankList(res.data.list))
            dispatch(setEnterLoading(false))
        })
    }
}