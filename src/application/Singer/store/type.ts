import * as actionTypes from './constants'

export interface setDetailAction {
    type: typeof actionTypes.Set_Singer_Detail,
    data: any
}

export type singerAction = setDetailAction