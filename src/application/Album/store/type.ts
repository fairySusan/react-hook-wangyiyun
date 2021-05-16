import * as actionTypes from './constants'
export interface GetDetailAction {
    type: typeof actionTypes.Get_Album_Detail,
    data: any
}

export interface SetEnterLoadingAction {
    type: typeof actionTypes.Set_Enter_Loading,
    data: boolean
}

export type AlbumAction = GetDetailAction | SetEnterLoadingAction