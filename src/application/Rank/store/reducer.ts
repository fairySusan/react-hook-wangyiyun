import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { ActionI } from './type'

const defaultState = fromJS({
    rankList: [],
    enterLoading: true
})

export default (state = defaultState, action: ActionI) => {
    switch (action.type) {
        case actionTypes.SET_RANK_LIST:
            return state.set('rankList', action.data)
        case actionTypes.SET_ENTER_LOADING:
            return state.set('enterLoading', action.data)
        default: return state
    }
}