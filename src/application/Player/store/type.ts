import * as actionTypes from './constants'

interface PlayAction {
    type: typeof actionTypes.Playing,
    data: boolean
}

interface FullScreenAction {
    type: typeof actionTypes.FullScreen,
    data: boolean
}

interface PercentAction {
    type: typeof actionTypes.Percent,
    data: number
}

interface CurrentIndexAction {
    type: typeof actionTypes.Set_Current_index,
    data: number
}

interface ShowPlayListAction {
    type: typeof actionTypes.Set_Show_PlayList,
    data: boolean
}

interface CurrentSongAction {
    type: typeof actionTypes.Set_Current_Song,
    data: any
}

interface PlayListAction {
    type: typeof actionTypes.Set_PlayList,
    data: any[]
}

interface SequencePlayListAction {
    type: typeof actionTypes.Set_SequencePlayList,
    data: any[]
}

interface ModeAction {
    type: typeof actionTypes.Set_Mode,
    data: number
}

export type PlayerAction = PlayAction   | 
FullScreenAction   | PercentAction      | 
CurrentIndexAction | ShowPlayListAction | 
CurrentSongAction  | PlayListAction     |
SequencePlayListAction | ModeAction     