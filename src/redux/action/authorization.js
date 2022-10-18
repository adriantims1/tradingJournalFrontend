import axios from 'axios';
import { CHECK_SESSION_VALID, CHECK_SESSION_VALID_SUCCESS, CHECK_SESSION_VALID_FAIL } from '../type/authorization';
import { RESET_STATE } from '../type/universal';

export const checkSession = () => async (dispatch) => {
  try {
    dispatch({ type: CHECK_SESSION_VALID });
    const data = await axios.get('https://tradingjournalbackend.azurewebsites.net/api/profile/session');
    console.log(data.data.status);
    if (data.data.status !== 'success') {
      localStorage.removeItem('persist:root');
      dispatch({ type: RESET_STATE });
    }
    dispatch({ type: CHECK_SESSION_VALID_SUCCESS, payload: { authorized: data.data.status === 'success' } });
  } catch (error) {
    dispatch({ type: CHECK_SESSION_VALID_FAIL, payload: { errorMessage: error.response.data.data } });
  }
};
