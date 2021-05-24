import { connect, ConnectedProps } from 'react-redux'
import { Dispatch} from 'redux'
import { ThunkDispatchTy } from 'src/store'
import * as playActions from 'src/application/Player/store/action'

const mapState = (state: any) => ({
})

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
    setPlayList: (data: any[]) => {(dispatch as Dispatch)(playActions.setPlayList(data));},
    setSequecePlayList: (data: any[]) => {(dispatch as Dispatch)(playActions.setSequencePlayList(data));},
    setCurrentIndex: (data: number) => {(dispatch as Dispatch)(playActions.setCurrentIndex(data));},
})


export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>