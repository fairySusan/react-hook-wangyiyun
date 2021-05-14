import {SET_RANK_LIST, SET_ENTER_LOADING} from './constants'
export interface GetListAction {
    type: typeof SET_RANK_LIST
    data: []
}

export interface EnterLoadingAction {
    type: typeof SET_ENTER_LOADING,
    data: boolean
}

export type ActionI = GetListAction | EnterLoadingAction