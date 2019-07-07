import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import Root from '../Root';
import App from '../components/App';

const endpoint = '/api/get_tweets';
const responseSuccess = {
  response: {
    Name1: [{ order: 0, tweet: 'tweet1' }, { order: 2, tweet: 'tweet2' }],
    Name2: [{ order: 1, tweet: 'tweet2' }]
  }
};
const responseError = {
  error: [['corrputed_file', 'user.txt'], ['corrputed_file', 'tweet.txt']]
};
const badResponse = {
  bad: 'response'
};

let wrapped;

describe('Integration Tests', () => {
  beforeEach(() => {
    moxios.install();
    wrapped = mount(
      <Root>
        <App />
      </Root>
    );
  });

  afterEach(() => {
    moxios.uninstall();
    wrapped.unmount();
  });

  describe('Successful Tweets', () => {
    beforeEach(() => {
      moxios.stubRequest(endpoint, {
        status: 200,
        response: responseSuccess
      });
    });

    it('will display the correct number of tweets', done => {
      wrapped.find('button').simulate('click');

      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('li').length).toEqual(3);
        done();
      });
    });

    it('will display the correct number of tweeters', done => {
      wrapped.find('button').simulate('click');

      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('ul').length).toEqual(2);
        done();
      });
    });
  });

  describe('Error Tweets', () => {
    it('displays an error message if response is in error format', done => {
      moxios.stubRequest(endpoint, {
        status: 200,
        response: responseError
      });

      wrapped.find('button').simulate('click');

      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('li').length).toEqual(2);
        done();
      });
    });
  });

  describe('Bad Response', () => {
    it('will handle an incorrect reponse format', () => {
      moxios.stubRequest(endpoint, {
        status: 200,
        response: badResponse
      });

      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('ul').length).toEqual(0);
        expect(wrapped.find('li').length).toEqual(0);
        done();
      });
    });
  });
});
