import axios from 'axios';
import { RESET_STATE } from '../type/universal';

export const resetState = (callBack) => async (dispatch) => {
  try {
    await axios.post('https://tradingjournalbackend.azurewebsites.net/api/profile/logout');
    localStorage.removeItem('persist:root');
    dispatch({ type: RESET_STATE });
    callBack();
  } catch (err) {
    console.log('error', err);
  }
};
