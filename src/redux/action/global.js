import axios from 'axios';
import { RESET_STATE } from '../type/universal';
import { CHECK_SESSION_VALID_SUCCESS } from '../type/authorization';

export const resetState = (callBack) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/api/profile/logout');
    localStorage.removeItem('persist:root');
    dispatch({ type: RESET_STATE });
    callBack();
  } catch (err) {
    console.log('error', err);
  }
};
