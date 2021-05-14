import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import { actions } from './store'

const mapState = (state: any) => ({
    rankList: state.getIn(['rank', 'rankList']),
    enterLoading: state.getIn(['rank', 'enterLoading'])
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
    getRankList: () => {(dispatch as ThunkDispatchTy)(actions.getRankList())}
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>