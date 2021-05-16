import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import { actions } from './store'

const mapState = (state: any) => ({
  enterLoading: state.getIn(['album', 'enterLoading']),
  detail: state.getIn(['album', 'detail'])
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  getAlbumDetail: (id: number) => {(dispatch as ThunkDispatchTy)(actions.getAlbumDetail(id))}
})


export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>