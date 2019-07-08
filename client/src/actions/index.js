import axios from 'axios';
import { GET_TWEETS, CLEAR_TWEETS, SHOW_LOADER, HIDE_LOADER } from './types';

export const getTweets = () => async dispatch => {
  try {
    const res = await axios.get('/api/get_tweets');

    dispatch({ type: GET_TWEETS, payload: res.data });
  } catch (err) {
    console.log(err);

    if (
      err.message === 'Network Error' ||
      'Request failed with status code 502'
    )
      dispatch({ type: HIDE_LOADER });
  }
};

export const clearTweets = () => async dispatch => {
  dispatch({ type: CLEAR_TWEETS });
};

export const showLoader = showLoader => dispatch => {
  dispatch({ type: showLoader ? SHOW_LOADER : HIDE_LOADER });
};
