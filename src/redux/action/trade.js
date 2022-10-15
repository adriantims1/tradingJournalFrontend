/* eslint-disable arrow-body-style */
import axios from 'axios';

import {
  FETCH_TRADE,
  FETCH_TRADE_FAIL,
  FETCH_TRADE_SUCCESS,
  ADD_TRADE,
  ADD_TRADE_FAIL,
  ADD_TRADE_SUCCESS,
} from '../type/trade';

export const fetchTrade = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TRADE });
      const data = await axios.get(`http://localhost:5000/api/profile/trade/${userId}`);
      dispatch({ type: FETCH_TRADE_SUCCESS, payload: { trades: data.data } });
    } catch (error) {
      dispatch({ type: FETCH_TRADE_FAIL, payload: { errorMessage: error.message } });
    }
  };
};

export const addTrade = (newTrade) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch({ type: ADD_TRADE });
      await axios.post(`http://localhost:5000/api/profile/trade`, {
        ...newTrade,
      });
      dispatch({ type: ADD_TRADE_SUCCESS, payload: { trades: newTrade } });
    } catch (error) {
      dispatch({ type: ADD_TRADE_FAIL, payload: { errorMessage: error.message } });
    }
  };
};

// export const deleteTrade = (tradeId) => {
//   return async (dispatch) => {
//     try {

//     } catch (error) {}
//   };
// };
