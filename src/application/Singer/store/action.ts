import { AxiosResponse } from 'axios';
import * as actionTypes from './constants'
import { getSingerInfoRequest } from 'src/api/request'
import { Dispatch } from 'redux'

export const setDetail = (data: any) => ({
    type: actionTypes.Set_Singer_Detail,
    data
})

export const setEnterLoading = (data: boolean) => ({
    type: actionTypes.Set_Enter_Loading,
    data
})


export const getSingerDetail = (id: number) => {
    return (dispatch: Dispatch) => {
        getSingerInfoRequest(id).then((res: AxiosResponse) => {
            dispatch(setDetail(res.data));
            dispatch(setEnterLoading(false))
        })
    }
}