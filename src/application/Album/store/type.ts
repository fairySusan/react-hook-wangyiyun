import * as actionTypes from './constants'
export interface GetDetailAction {
    type: typeof actionTypes.Get_Album_Detail,
    data: any
}

export type AlbumAction = GetDetailAction