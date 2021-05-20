import * as actionTypes from './constants'

interface PlayAction {
    type: typeof actionTypes.Playing,
    data: boolean
}

interface FullScreenAction {
    type: typeof actionTypes.FullScreen,
    data: boolean
}

export type PlayerAction = PlayAction | FullScreenAction