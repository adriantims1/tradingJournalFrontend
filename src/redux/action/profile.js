/* eslint-disable arrow-body-style */
import axios from 'axios';

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

import { CHECK_SESSION_VALID_SUCCESS } from '../type/authorization';

export const fetchProfile = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PROFILE });
      const data = await axios.post('http://localhost:5000/api/profile/login', {
        email,
        password,
      });
      const { name, profileUrl } = data.data;
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: { name, profileUrl, email } });
      dispatch({ type: CHECK_SESSION_VALID_SUCCESS, payload: { authorized: true } });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_PROFILE_FAIL, payload: { errorMessage: err.response.data.data } });
    }
  };
};

export const modifyProfilePictureOrName = (profileUrl, name, email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MODIFY_PROFILE });
      await axios.put('http://localhost:5000/api/profile', { profileUrl, name });
      dispatch({ type: MODIFY_PROFILE_SUCCESS, payload: { profileUrl, name, email } });
    } catch (err) {
      dispatch({ type: MODIFY_PROFILE_FAIL, payload: { errorMessage: err.message } });
    }
  };
};

export const modifyPassword = (password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MODIFY_PASSWORD });
      await axios.put('http://localhost:5000/api/profile/password', { password });
      dispatch({ type: MODIFY_PASSWORD_SUCCESS });
    } catch (err) {
      dispatch({ type: MODIFY_PASSWORD_FAIL, payload: { errorMessage: err.message } });
    }
  };
};
