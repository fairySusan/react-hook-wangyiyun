import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import { actions } from './store'

const mapState = (state: any) => ({
  enterLoading: state.getIn(['singer', 'enterLoading']),
  detail: state.getIn(['singer', 'detail'])
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  getSingerDetail: (id: number) => {(dispatch as ThunkDispatchTy)(actions.getSingerDetail(id))}
})


export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>