import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import { actions } from './store'

const mapState = (state: any) => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing'])
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  setFullScreen: (data: boolean) => {(dispatch as Dispatch)(actions.setFullScreen(data))},
  setPlaying: (data: boolean) => {(dispatch as Dispatch)(actions.setPlaying(data))},
})


export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>