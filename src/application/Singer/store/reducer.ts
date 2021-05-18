import * as actionTypes from './constants';
import {singerAction} from './type'
import { fromJS } from 'immutable';
const defaultState = fromJS({
    detail: null
})

export default (state = defaultState, action: singerAction) => {
    switch(action.type) {
        case actionTypes.Set_Singer_Detail:
            return state.set('detail', action.data)
        default: return state
    }
}