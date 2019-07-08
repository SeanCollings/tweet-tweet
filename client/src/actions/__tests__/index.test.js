import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getTweets, clearTweets, showLoader } from '../index';
import { GET_TWEETS, CLEAR_TWEETS, SHOW_LOADER, HIDE_LOADER } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore();

const response = 'getTweets';
const endpoint = '/api/get_tweets';

describe('Actions', () => {
  describe('getTweets', () => {
    beforeEach(() => {
      store.clearActions();
      moxios.install();
      moxios.stubRequest(endpoint, {
        status: 200,
        response
      });
    });

    afterEach(() => {
      moxios.uninstall();
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

  describe('clearTweets', () => {
    beforeEach(() => {
      store.clearActions();
    });

    it('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: CLEAR_TWEETS
        }
      ];

      store.dispatch(clearTweets());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('showLoad', () => {
    beforeEach(() => {
      store.clearActions();
    });

    it('shows the loader when passed true', () => {
      const expectedActions = [
        {
          type: SHOW_LOADER
        }
      ];

      store.dispatch(showLoader(true));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('hides the loader when passed false', () => {
      const expectedActions = [
        {
          type: HIDE_LOADER
        }
      ];

      store.dispatch(showLoader(false));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
