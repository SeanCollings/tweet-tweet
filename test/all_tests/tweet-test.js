import { expect } from 'chai';
import * as tweet from '../../server/tweet';

export default () => {
  return describe('tweet', () => {
    it('should exist', () => {
      expect(tweet).to.exist;
    });

    const tweetFileInput = 'Name1> Message';

    describe('initialiseTweets()', () => {
      it('should return a function for a valid tweet input', () => {
        const discernTweetFile = tweet.initialiseTweets(tweetFileInput);

        expect(discernTweetFile).to.be.a('Function');
      });

      it('returns a function that returns an object for a valid tweet file input', () => {
        const discernTweetFile = tweet.initialiseTweets(tweetFileInput);
        const result = discernTweetFile(tweetFileInput, {});

        expect(result).to.be.a('Object');
      });
    });
  });
};
