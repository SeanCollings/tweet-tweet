import loaderReducer from '../loaderReducer';
import { SHOW_LOADER, HIDE_LOADER } from '../../actions//types';

const initialState = {
  show: false
};

describe('LoaderReducer', () => {
  it('handles actions of type SHOW_LOADER', () => {
    const action = {
      type: SHOW_LOADER
    };

    const newState = loaderReducer(initialState, action);
    expect(newState).toEqual({ show: true });
  });

  it('handles actions of type HIDE_LOADER', () => {
    const action = {
      type: HIDE_LOADER
    };

    const newState = loaderReducer(initialState, action);
    expect(newState).toEqual({ show: false });
  });

  it('handles action with unknown type', () => {
    const unknownAction = {
      type: 'UNKNOWN'
    };
    const newState = loaderReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });
});
