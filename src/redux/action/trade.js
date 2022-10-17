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
  DELETE_TRADE,
  DELETE_TRADE_FAIL,
  DELETE_TRADE_SUCCESS,
} from '../type/trade';

export const fetchTrade = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_TRADE });
      const data = await axios.get(`https://tradingjournalbackend.azurewebsites.net/api/trade/`);
      dispatch({ type: FETCH_TRADE_SUCCESS, payload: { trades: data.data.data } });
    } catch (error) {
      dispatch({ type: FETCH_TRADE_FAIL, payload: { errorMessage: error.message } });
    }
  };
};

export const addTrade = (newTrade, success, fail) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TRADE });
      const formData = new FormData();
      formData.append('image', newTrade.entryScreenshot);
      const data = await axios.post('https://tradingjournalbackend.azurewebsites.net/api/trade/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const allTrades = await axios.post(`https://tradingjournalbackend.azurewebsites.net/api/trade`, {
        ...newTrade,
        entryScreenshot: data.data.data,
      });
      dispatch({ type: ADD_TRADE_SUCCESS, payload: { trades: allTrades.data.data } });
      success();
    } catch (error) {
      dispatch({ type: ADD_TRADE_FAIL, payload: { errorMessage: error.response.data.data } });
      fail();
    }
  };
};

export const deleteTrade = (tradeId, next) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_TRADE });
      const data = await axios.delete('https://tradingjournalbackend.azurewebsites.net/api/trade', { Id: tradeId });
      dispatch({ type: DELETE_TRADE_SUCCESS, payload: { trades: data.data.data } });
      next();
    } catch (error) {
      dispatch({ type: DELETE_TRADE_FAIL, payload: { errorMessage: error.response.data.data } });
      next();
    }
  };
};
