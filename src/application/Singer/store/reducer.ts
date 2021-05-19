import * as actionTypes from './constants';
import {singerAction} from './type'
import { fromJS } from 'immutable';
const defaultState = fromJS({
    detail: null,
    enterLoading: true
})

export default (state = defaultState, action: singerAction) => {
    switch(action.type) {
        case actionTypes.Set_Singer_Detail:
            return state.set('detail', action.data)
        case actionTypes.Set_Enter_Loading:
            return state.set('enterLoading', action.data)
        default: return state
    }
}