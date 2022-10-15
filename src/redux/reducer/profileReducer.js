/* eslint-disable default-param-last */
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  MODIFY_PROFILE,
  MODIFY_PROFILE_FAIL,
  MODIFY_PROFILE_SUCCESS,
  MODIFY_PASSWORD,
  MODIFY_PASSWORD_FAIL,
  MODIFY_PASSWORD_SUCCESS,
} from '../type/profile';

import { RESET_STATE } from '../type/universal';

const initialState = { email: '', name: '', profileUrl: '', isFetching: false, hasError: false, errorMessage: '' };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE:
      return { ...state, isFetching: true, hasError: false, errorMessage: '' };
    case FETCH_PROFILE_FAIL:
      return { ...state, isFetching: false, hasError: true, errorMessage: payload.errorMessage };
    case FETCH_PROFILE_SUCCESS:
      return { ...state, isFetching: false, email: payload.email, name: payload.name, profileUrl: payload.profileUrl };
    case MODIFY_PROFILE:
      return { ...state, isFetching: true, hasError: false, errorMessage: '' };
    case MODIFY_PROFILE_FAIL:
      return { ...state, isFetching: false, hasError: true, errorMessage: payload.errorMessage };
    case MODIFY_PROFILE_SUCCESS:
      return { ...state, isFetching: false, email: payload.email, name: payload.name, profileUrl: payload.profileUrl };
    case MODIFY_PASSWORD:
      return { ...state, isFetching: true, hasError: false, errorMessage: '' };
    case MODIFY_PASSWORD_FAIL:
      return { ...state, isFetching: false, hasError: true, errorMessage: payload.errorMessage };
    case MODIFY_PASSWORD_SUCCESS:
      return { ...state, isFetching: false };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
