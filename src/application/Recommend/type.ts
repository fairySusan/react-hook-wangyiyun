import { act } from '@testing-library/react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, Action} from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState, ThunkDispatchTy } from 'src/store'
import { actions } from './store'

const mapState = (state: any) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  getBanner: () => {(dispatch as ThunkDispatchTy)(actions.getBannerList())},
  getRecommend: () => {(dispatch as ThunkDispatchTy)(actions.getRecommendList())}
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>

export interface recommendListItem {
  id: number,
  picUrl: string,
  playCount: number,
  name: string
}
