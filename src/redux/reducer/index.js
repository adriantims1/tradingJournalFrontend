import { combineReducers } from 'redux';

import profileReducer from './profileReducer';
import tradeReducer from './tradeReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  trade: tradeReducer,
});

export default rootReducer;
