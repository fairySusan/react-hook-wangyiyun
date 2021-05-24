import { fromJS } from 'immutable';
import {PlayerAction} from './type'
import * as actionTypes from './constants'
import { playMode } from 'src/api/config';

const defaultState = fromJS({
    playing: false,
    fullScreen: false,
    percent: 0,
    currentIndex: -1,// 当前歌曲在播放列表的索引位置
    showPlayList: false,// 是否展示播放列表
    currentSong: null,
    playList: [],
    sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    mode: playMode.sequence,// 播放模式
})

export default (state = defaultState, action: PlayerAction) => {
    switch(action.type) {
        case actionTypes.Playing:
            return state.set('playing', action.data)
        case actionTypes.FullScreen:
            return state.set('fullScreen', action.data)
        case actionTypes.Percent:
            return state.set('percent', action.data)
        case actionTypes.Set_Current_index:
            return state.set('currentIndex', action.data)
        case actionTypes.Set_Show_PlayList:
            return state.set('showPlayList', action.data)
        case actionTypes.Set_Current_Song:
            return state.set('currentSong', action.data)
        case actionTypes.Set_PlayList:
            return state.set('playList', action.data)
        case actionTypes.Set_SequencePlayList:
            return state.set('sequencePlayList', action.data)
        case actionTypes.Set_Mode:
            return state.set('mode', action.data)
        default: return state
    }
}