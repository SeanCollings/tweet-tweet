import networkResponseReducer from '../networkResponseReducer';
import { NETWORK_ERROR_RESPONSE } from '../../actions/types';

const initialState = {
  response: null
};
const payload = 'Network Error';

describe('Jest Client networkResponseReducer', () => {
  it('handles actions of type NETWORK_ERROR_RESPONSE', () => {
    const action = {
      type: NETWORK_ERROR_RESPONSE,
      payload
    };

    const newState = networkResponseReducer(initialState, action);
    expect(newState).toEqual({ response: payload });
  });

  it('handles action with unknown type', () => {
    const unknownAction = {
      type: 'UNKNOWN'
    };
    const newState = networkResponseReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
  });
});
