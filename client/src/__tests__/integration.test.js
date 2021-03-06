import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import Root from '../Root';
import App from '../components/App';

const endpoint = '/api/get_tweets';
const responseSuccess = {
  response: {
    Name1: [{ order: 0, tweet: 'tweet1' }, { order: 2, tweet: 'tweet3' }],
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

describe('Jest Client Integration Tests', () => {
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
        expect(wrapped.find('.tweet-message').length).toEqual(3);
        done();
      });
    });

    it('will display the correct number of followers', done => {
      wrapped.find('button').simulate('click');

      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('.tweet-follower').length).toEqual(2);
        done();
      });
    });
  });

  describe('Clear Tweets', () => {
    it('should clear all tweets', done => {
      moxios.stubRequest(endpoint, {
        status: 200,
        response: responseSuccess
      });

      wrapped.find('button').simulate('click');

      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('.tweet-message').length).toEqual(3);
        expect(wrapped.find('.tweet-follower').length).toEqual(2);

        wrapped.find('button').simulate('click');
        wrapped.update();

        expect(wrapped.find('.tweet-follower').length).toEqual(0);
        expect(wrapped.find('.tweet-message').length).toEqual(0);

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
        expect(wrapped.find('.tweet-error').length).toEqual(2);
        done();
      });
    });
  });

  describe('Bad Response', () => {
    it('will handle an incorrect reponse format', done => {
      moxios.stubRequest(endpoint, {
        status: 200,
        response: badResponse
      });

      moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('.tweet-error').length).toEqual(0);
        expect(wrapped.find('.tweet-follower').length).toEqual(0);
        expect(wrapped.find('.tweet-message').length).toEqual(0);
        done();
      });
    });
  });
});
