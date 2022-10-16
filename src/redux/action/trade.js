/* eslint-disable arrow-body-style */
import axios from 'axios';
import FormData from 'form-data';

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

export const addTrade = (newTrade, next) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TRADE });
      const formData = new FormData();
      formData.append('image', newTrade.entryScreenshot);
      const data = await axios.post('http://localhost:5000/api/trade/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await axios.post(`http://localhost:5000/api/trade`, {
        ...newTrade,
        entryScreenshot: data.data.data,
      });
      dispatch({ type: ADD_TRADE_SUCCESS, payload: { trades: newTrade } });
      next();
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
