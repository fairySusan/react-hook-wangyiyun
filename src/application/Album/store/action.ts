import { AxiosResponse } from 'axios';
import {fromJS} from 'immutable';
import * as actionTypes from './constants'
import { Dispatch } from 'redux'
import { getAlbumDetailRequest } from 'src/api/request'

export const setDetail = (data: any) => ({
    type: actionTypes.Get_Album_Detail,
    data
})

export const getAlbumDetail = (id: number) => {
    return (dispatch: Dispatch) => {
        getAlbumDetailRequest(id).then((res: AxiosResponse) => {
            dispatch(setDetail(res.data))
        })
    }
}