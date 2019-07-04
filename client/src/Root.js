import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const compose =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : f => f;

export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(reduxThunk))
  );

  return <Provider store={store}>{children}</Provider>;
};
