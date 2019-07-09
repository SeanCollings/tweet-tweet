import { expect } from 'chai';
import * as user from '../../server/user';

export default () => {
  return describe('user', () => {
    it('should exist', () => {
      expect(user).to.exist;
    });

    const userFileInput = 'Name1 follows Name2';

    describe('discernUserFile()', () => {
      it('should return an object for a valid user input', () => {
        const result = user.discernUserFile(userFileInput, {});

        expect(result).to.be.a('Object');
      });
    });
  });
};
