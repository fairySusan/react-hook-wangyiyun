import { fromJS } from 'immutable';
import {PlayerAction} from './type'
import * as actionTypes from './constants'
const defaultState = fromJS({
    playing: false,
    fullScreen: false
})

export default (state = defaultState, action: PlayerAction) => {
    switch(action.type) {
        case actionTypes.Playing:
            return state.set('playing', action.data)
        case actionTypes.FullScreen:
            return state.set('fullScreen', action.data)
        default: return state
    }
}