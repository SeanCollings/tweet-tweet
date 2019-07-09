import { expect } from 'chai';
import * as tweetRoutes from '../../routes/tweetRoutes';

export default () => {
  return describe('tweetRoutes', () => {
    it('should exist', () => {
      expect(tweetRoutes).to.exist;
    });

    it('should be of type function', () => {
      expect(tweetRoutes.default).to.be.a('Function');
    });
  });
};
