import { combineReducers } from 'redux-immutable';
import { reducer as recommend } from 'src/application/Recommend/store'
import { reducer as singers } from 'src/application/Singers/store';
import { reducer as rank } from 'src/application/Rank/store'
import { reducer as album} from 'src/application/Album/store'

export const rootReducer = combineReducers({
  recommend,
  singers,
  rank,
  album
});
