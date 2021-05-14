import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import { actions } from './store'

const mapState = (state: any) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
    getSingerListFull: (category?: any, alpha?: string) => {
        (dispatch as Dispatch)(actions.changeEnterLoading(true));
        (dispatch as ThunkDispatchTy)(actions.getSingerList(1,category,alpha))
    },
    // 下拉刷新
    getSingerListPullDown: (category?: any, alpha?: string) => {
        (dispatch as Dispatch)(actions.changePullDownLoading(true));
        (dispatch as ThunkDispatchTy)(actions.getSingerList(1,category,alpha))
    },
    // 上拉加载更多
    getSingerListPullUp: (count: number,category?: any, alpha?: string) => {
        (dispatch as Dispatch)(actions.changePullUpLoading(true));
        (dispatch as ThunkDispatchTy)(actions.getSingerList(count,category,alpha))
    }
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>