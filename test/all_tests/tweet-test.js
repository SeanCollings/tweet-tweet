import { expect } from 'chai';
import * as tweet from '../../server/tweet';

export default () => {
  return describe('tweet', () => {
    it('should exist', () => {
      expect(tweet).to.exist;
    });
  });
};
