import { combineReducers } from 'redux-immutable';
import { reducer as recommend } from 'src/application/Recommend/store'
import { reducer as singers } from 'src/application/Singers/store';
import { reducer as rank } from 'src/application/Rank/store'
import { reducer as album} from 'src/application/Album/store'
import { reducer as singer} from 'src/application/Singer/store'
import { reducer as player} from 'src/application/Player/store'

export const rootReducer = combineReducers({
  recommend,
  singers,
  rank,
  album,
  singer,
  player
});
