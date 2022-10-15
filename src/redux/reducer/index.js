import { combineReducers } from 'redux';

import profileReducer from './profileReducer';
import tradeReducer from './tradeReducer';
import authorizationReducer from './authorizationReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  trade: tradeReducer,
  authorization: authorizationReducer,
});

export default rootReducer;
