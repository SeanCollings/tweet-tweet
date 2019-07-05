import axios from 'axios';
import { GET_TWEETS } from './types';

export const getTweets = () => async dispatch => {
  const res = await axios.get('/api/get_tweets');

  dispatch({ type: GET_TWEETS, payload: res.data });
};
