import axios from 'axios';
import {
  GET_TWEETS,
  CLEAR_TWEETS,
  SHOW_LOADER,
  HIDE_LOADER,
  NETWORK_ERROR_RESPONSE
} from './types';

export const getTweets = () => async dispatch => {
  try {
    const res = await axios.get('/api/get_tweets');

    dispatch({ type: GET_TWEETS, payload: res.data });
    dispatch({ type: NETWORK_ERROR_RESPONSE, payload: null });
  } catch (err) {
    dispatch({ type: HIDE_LOADER });
    dispatch({ type: NETWORK_ERROR_RESPONSE, payload: err.message });
  }
};

export const clearTweets = () => async dispatch => {
  dispatch({ type: CLEAR_TWEETS });
};

export const showLoader = showLoader => dispatch => {
  dispatch({ type: showLoader ? SHOW_LOADER : HIDE_LOADER });
};
