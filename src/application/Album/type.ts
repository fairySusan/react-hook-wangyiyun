import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import { actions } from './store'
import * as playActions from 'src/application/Player/store/action'

const mapState = (state: any) => ({
  enterLoading: state.getIn(['album', 'enterLoading']),
  detail: state.getIn(['album', 'detail'])
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  getAlbumDetail: (id: number) => {(dispatch as ThunkDispatchTy)(actions.getAlbumDetail(id))},
  clickSong: (data: any) => {
    (dispatch as ThunkDispatchTy)(playActions.setPlayList(data));
    (dispatch as Dispatch)(playActions.setPlaying(true));
    (dispatch as Dispatch)(playActions.setCurrentSong(data))
  }
})


export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>