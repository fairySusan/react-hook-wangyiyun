import * as actionTypes from './constants'
import { Dispatch } from 'redux'
import {AppState} from 'src/store'
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象


export const setPlaying = (data: boolean) => ({
    type: actionTypes.Playing,
    data
})

export const setFullScreen = (data: boolean) => ({
    type: actionTypes.FullScreen,
    data
})

export const setPercent = (data: number) => ({
    type: actionTypes.Percent,
    data
})

export const setCurrentIndex = (data: number) => ({
    type: actionTypes.Set_Current_index,
    data
})

export const setShowPlayList = (data: boolean) => ({
    type: actionTypes.Set_Show_PlayList,
    data
})

export const setCurrentSong = (data: any) => ({
    type: actionTypes.Set_Current_Song,
    data: fromJS(data)
})


export const setPlayList = (data: any[]) => ({
    type: actionTypes.Set_PlayList,
    data: fromJS(data)
})

export const setSequencePlayList = (data: any[]) => ({
    type: actionTypes.Set_SequencePlayList,
    data: fromJS(data)
})

export const setMode = (data:number) => ({
    type: actionTypes.Set_Mode,
    data
})






