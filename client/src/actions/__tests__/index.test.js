import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getTweets } from '../index';
import { GET_TWEETS } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

const response = 'getTweets';
const endpoint = '/api/get_tweets';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(endpoint, {
    status: 200,
    response
  });
});

afterEach(() => {
  moxios.uninstall();
});

describe('Actions - getTweets', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches the correct action and payload', done => {
    const expectedActions = [
      {
        type: GET_TWEETS,
        payload: response
      }
    ];

    store.dispatch(getTweets());

    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should call the correct endpoint', done => {
    store.dispatch(getTweets());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent().config.url;
      expect(request).toEqual(endpoint);
      done();
    });
  });
});
