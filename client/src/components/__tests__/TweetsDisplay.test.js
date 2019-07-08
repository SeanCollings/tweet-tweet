import React from 'react';
import { mount } from 'enzyme';

import Root from '../../Root';
import TweetsDisplay from '../TweetsDisplay';

const tweets = {
  response: {
    Name1: [{ order: 0, tweet: 'tweet1' }, { order: 2, tweet: 'tweet3' }],
    Name2: [{ order: 1, tweet: 'tweet2' }]
  }
};
const error = {
  error: [['corrupted_file', 'user.txt'], ['corrupted_file', 'tweet.txt']]
};
const badResponse = {
  bad: 'response'
};

describe('TweetsDisplay', () => {
  let wrapped;

  describe('Pre-load', () => {
    it('displays a div only', () => {
      const initialState = {
        tweets: { tweets: null }
      };

      wrapped = mount(
        <Root initialState={initialState}>
          <TweetsDisplay />
        </Root>
      );

      expect(wrapped.find('div').length).toEqual(1);
      expect(wrapped.find('.tweet-follower').length).toEqual(0);
      expect(wrapped.find('.tweet-message').length).toEqual(0);
      expect(wrapped.find('.tweet-error').length).toEqual(0);

      wrapped.unmount();
    });
  });

  describe('Successful Response', () => {
    it('displays the tweets in the correct format', () => {
      const initialState = {
        tweets: { tweets }
      };

      wrapped = mount(
        <Root initialState={initialState}>
          <TweetsDisplay />
        </Root>
      );

      expect(wrapped.find('.tweet-follower').length).toEqual(2);
      expect(wrapped.find('.tweet-message').length).toEqual(3);

      wrapped.unmount();
    });
  });

  describe('Error Response', () => {
    it('displays the error response in the correct format', () => {
      const initialState = {
        tweets: { tweets: error }
      };

      wrapped = mount(
        <Root initialState={initialState}>
          <TweetsDisplay />
        </Root>
      );

      expect(wrapped.find('.tweet-error').length).toEqual(2);

      wrapped.unmount();
    });
  });

  describe('Bad Response', () => {
    it('will handle an incorrect reponse format', () => {
      const initialState = {
        tweets: { tweets: badResponse }
      };

      wrapped = mount(
        <Root initialState={initialState}>
          <TweetsDisplay />
        </Root>
      );

      expect(wrapped.find('div').length).toEqual(1);
      expect(wrapped.find('.tweet-follower').length).toEqual(0);
      expect(wrapped.find('.tweet-message').length).toEqual(0);
      expect(wrapped.find('.tweet-error').length).toEqual(0);

      wrapped.unmount();
    });
  });
});
