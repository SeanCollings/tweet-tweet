import { combineReducers } from 'redux';
import tweetsReducer from './tweetsReducer';
import loaderReducer from './loaderReducer';

export default combineReducers({
  tweets: tweetsReducer,
  loader: loaderReducer
});
