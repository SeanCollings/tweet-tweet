import { SHOW_LOADER, HIDE_LOADER } from '../actions/types';

const initialState = {
  show: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, show: true };
    case HIDE_LOADER:
      return { ...state, show: false };
    default:
      return state;
  }
}
