import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import { actions } from './store'

const mapState = (state: any) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  percent: state.getIn(['player', 'percent']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
  mode: state.getIn(['player', 'mode'])
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  setFullScreen: (data: boolean) => {(dispatch as Dispatch)(actions.setFullScreen(data))},
  setPlaying: (data: boolean) => {(dispatch as Dispatch)(actions.setPlaying(data))},
  setPercent: (data: number) => {(dispatch as Dispatch)(actions.setPercent(data))},
  setCurrentIndex: (data: number) => {(dispatch as Dispatch)(actions.setCurrentIndex(data))},
  setCurrentSong: (data: any) => {(dispatch as Dispatch)(actions.setCurrentSong(data))},
  setMode: (data: number) => {(dispatch as Dispatch)(actions.setMode(data))},
  setPlayList: (data: any) => {(dispatch as ThunkDispatchTy)(actions.setPlayList(data))},
})


export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>