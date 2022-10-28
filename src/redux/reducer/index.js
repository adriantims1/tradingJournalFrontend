import { combineReducers } from 'redux';

import profileReducer from './profileReducer';
import futureReducer from './futureReducer';
import authorizationReducer from './authorizationReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  future: futureReducer,
  authorization: authorizationReducer,
});

export default rootReducer;
