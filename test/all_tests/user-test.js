import { expect } from 'chai';
import * as user from '../../server/user';

export default () => {
  return describe('user', () => {
    it('should exist', () => {
      expect(user).to.exist;
    });
  });
};
