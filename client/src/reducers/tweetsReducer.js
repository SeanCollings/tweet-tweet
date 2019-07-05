import { GET_TWEETS } from '../actions/types';

const initialState = {
  tweets: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TWEETS:
      return { ...state, tweets: action.payload };
    default:
      return state;
  }
}
