import { combineReducers } from 'redux';
import tweetsReducer from './tweetsReducer';
import loaderReducer from './loaderReducer';
import networkResponseReducer from './networkResponseReducer';

export default combineReducers({
  tweets: tweetsReducer,
  loader: loaderReducer,
  networkResponse: networkResponseReducer
});
