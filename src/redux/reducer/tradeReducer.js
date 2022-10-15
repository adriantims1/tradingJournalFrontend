/* eslint-disable default-param-last */
import {
  FETCH_TRADE,
  FETCH_TRADE_FAIL,
  FETCH_TRADE_SUCCESS,
  ADD_TRADE,
  ADD_TRADE_FAIL,
  ADD_TRADE_SUCCESS,
} from '../type/trade';

import { RESET_STATE } from '../type/universal';

const initialState = { trades: [], isFetching: false, hasError: false, errorMessage: '' };

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case FETCH_TRADE:
      return { ...state, isFetching: true, hasError: false, errorMessage: '' };
    case FETCH_TRADE_FAIL:
      return { ...state, isFetching: false, hasError: true, errorMessage: payload.errorMessage };
    case FETCH_TRADE_SUCCESS:
      return { ...state, isFetching: false, trades: payload.trades };
    case ADD_TRADE:
      return { ...state, isFetching: true, hasError: false, errorMessage: '' };
    case ADD_TRADE_FAIL:
      return { ...state, isFetching: false, hasError: true, errorMessage: payload.errorMessage };
    case ADD_TRADE_SUCCESS:
      return { ...state, isFetching: false, trades: [payload.trades, ...state.trades] };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
