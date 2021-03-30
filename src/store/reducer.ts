import { combineReducers } from 'redux-immutable';
import { reducer as recommend } from 'src/application/Recommend/store'

export const rootReducer = combineReducers({
  recommend
});
