import React from 'react';
import Loader from 'react-loader-advanced';
import { mount } from 'enzyme';

import Root from '../../Root';
import Button from '../Button';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Button />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe('Jest Client App', () => {
  it('shows a button', () => {
    expect(wrapped.find('button').length).toEqual(1);
  });

  it('contains a Loader', () => {
    expect(wrapped.find(Loader).length).toEqual(1);
  });
});
