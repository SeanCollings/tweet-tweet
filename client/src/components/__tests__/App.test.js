import React from 'react';
import { mount } from 'enzyme';

import Root from '../../Root';
import App from '../App';
import TweetsDisplay from '../TweetsDisplay';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <App />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe('App', () => {
  it('shows a button', () => {
    expect(wrapped.find('button').length).toEqual(1);
  });

  it('shows the display tweets section', () => {
    expect(wrapped.find(TweetsDisplay).length).toEqual(1);
  });
});
