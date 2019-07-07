import tweetsReducer from '../tweetsReducer';
import { GET_TWEETS } from '../../actions//types';

const initialState = {
  tweets: null
};
const payload = { Name: [{ order: 0, tweet: 'tweet' }] };

describe('TweetsRedcuer', () => {
  it('handles actions of type GET_TWEETS', () => {
    const action = {
      type: GET_TWEETS,
      payload
    };

    const newState = tweetsReducer(initialState, action);
    expect(newState).toEqual({ tweets: payload });
  });

  it('handles action with unknown type', () => {
    const unknownAction = {
      type: 'UNKNOWN'
    };
    const newState = tweetsReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });
});
