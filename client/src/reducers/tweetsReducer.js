import { TEST } from '../actions/types';

const initialState = {
  tweets: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return { ...state, tweets: action.payload };
    default:
      return state;
  }
}
