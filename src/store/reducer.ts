import { combineReducers } from 'redux-immutable';
import { reducer as recommend } from 'src/application/Recommend/store'
import { reducer as singers } from '../application/Singers/store/index';

export const rootReducer = combineReducers({
  recommend,
  singers
});
