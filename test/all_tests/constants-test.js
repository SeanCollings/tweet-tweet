import { expect } from 'chai';
import * as constants from '../../utils/constants';

export default () => {
  return describe('constants', () => {
    it('should exist', () => {
      expect(constants).to.exist;
    });
  });
};
