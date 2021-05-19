import * as actionTypes from './constants'

interface PlayAction {
    type: typeof actionTypes.Playing,
    data: boolean
}

export type PlayerAction = PlayAction