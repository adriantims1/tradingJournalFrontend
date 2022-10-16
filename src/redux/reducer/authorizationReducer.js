/* eslint-disable default-param-last */
import { CHECK_SESSION_VALID, CHECK_SESSION_VALID_SUCCESS, CHECK_SESSION_VALID_FAIL } from '../type/authorization';

import { RESET_STATE } from '../type/universal';

const initialState = { authorized: false, isFetching: false, errorMessage: '' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECK_SESSION_VALID:
      return { isFetching: true, errorMessge: '', authorized: false };
    case CHECK_SESSION_VALID_FAIL:
      return { ...state, isFetching: false, errorMessage: payload.errorMessage };
    case CHECK_SESSION_VALID_SUCCESS:
      return { ...state, isFetching: false, authorized: payload.authorized };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
