import { GET_TWEETS, CLEAR_TWEETS } from '../actions/types';

const initialState = {
  tweets: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TWEETS:
      return { ...state, tweets: action.payload };
    case CLEAR_TWEETS:
      return { ...state, tweets: null };
    default:
      return state;
  }
}
