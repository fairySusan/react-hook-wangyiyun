import * as actionTypes from './constants'

export interface setDetailAction {
    type: typeof actionTypes.Set_Singer_Detail,
    data: any
}
export interface SetEnterLoadingAction {
    type: typeof actionTypes.Set_Enter_Loading,
    data: boolean
}

export type singerAction = setDetailAction | SetEnterLoadingAction