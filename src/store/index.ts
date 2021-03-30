import { createStore, compose, applyMiddleware, Action } from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk'
import { rootReducer } from './reducer'
const composeEnhancers = compose;

const store = createStore (rootReducer, composeEnhancers (
  applyMiddleware (thunk)
));

export type AppState = ReturnType<typeof rootReducer>

export type ThunkDispatchTy = ThunkDispatch<AppState, void, Action>

export default store;