import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import {AlbumAction} from './type'

const defaultState = fromJS({
    detail: null,
    enterLoading: true
})

export default (state = defaultState, action: AlbumAction) => {
    switch(action.type) {
        case actionTypes.Get_Album_Detail:
           return state.set('detail', action.data)
        case actionTypes.Set_Enter_Loading:
            return state.set('enterLoading', action.data)
        default: return state
    }
}