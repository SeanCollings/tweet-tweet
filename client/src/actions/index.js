import axios from 'axios';
import { TEST } from './types';

export const getTest = () => async dispatch => {
  const res = await axios.get('/api/test');

  dispatch({ type: TEST, payload: res.data });
};
