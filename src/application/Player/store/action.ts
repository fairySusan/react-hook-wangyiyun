import * as actionTypes from './constants'
import { Dispatch } from 'redux'

export const setPlaying = (data: boolean) => ({
    type: actionTypes.Playing,
    data
})