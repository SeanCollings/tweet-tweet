import { expect } from 'chai';
import { FILE_TYPE } from '../../utils/constants';
import { FILE_ERROR } from '../../client/src/utils/constants';

import * as userTweets from '../../server/userTweets';

export default () => {
  return describe('userTweets', () => {
    it('should exist', () => {
      expect(userTweets).to.exist;
    });

    const userFileOutput = { Name1: ['Name1', 'Name2'], Name2: ['Name2'] };
    const tweetFileOutput = {
      Name1: [{ order: 0, tweet: '@Name1: Message' }]
    };
    const userTweetOuput = {
      Name1: [{ order: 0, tweet: '@Name1: Message' }],
      Name2: []
    };

    describe('discernFileContents()', () => {
      const userFileInput = 'Name1 follows Name2';
      const tweetFileInput = 'Name1> Message';
      const badFile = 'bad_file';

      describe(`file type ${FILE_TYPE.USER}`, () => {
        it('should return a valid user object for a correct user file input', () => {
          const result = userTweets.discernFileContents(
            userFileInput,
            FILE_TYPE.USER
          );

          expect(result).to.be.a('Object');

          expect(Object.keys(result)[0]).to.equal(
            Object.keys(userFileOutput)[0]
          );
          expect(Object.keys(result)[1]).to.equal(
            Object.keys(userFileOutput)[1]
          );

          expect(Object.values(result)[0].length).to.equal(
            Object.values(userFileOutput)[0].length
          );
          expect(Object.values(result)[1].length).to.equal(
            Object.values(userFileOutput)[1].length
          );
        });

        it(`should return the string '${
          FILE_ERROR.CORRUPTED_FILE.constant
        }' for a bad file`, () => {
          const result = userTweets.discernFileContents(
            badFile,
            FILE_TYPE.USER
          );

          expect(result).to.be.a('String');
          expect(result).to.equal(FILE_ERROR.CORRUPTED_FILE.constant);
        });
      });

      describe(`file type ${FILE_TYPE.TWEET}`, () => {
        it('should return a valid tweet object for a correct tweet file input', () => {
          const result = userTweets.discernFileContents(
            tweetFileInput,
            FILE_TYPE.TWEET
          );
          const resultTweet = Object.values(result)[0];
          const tweetFileOutputTweet = Object.values(result)[0];

          expect(result).to.be.a('Object');
          expect(Object.keys(result)[0]).to.equal(
            Object.keys(tweetFileOutput)[0]
          );

          expect(resultTweet[0].length).to.equal(
            tweetFileOutputTweet[0].length
          );
          expect(resultTweet[0].count).to.equal(tweetFileOutputTweet[0].count);
          expect(resultTweet[0].tweet).to.equal(tweetFileOutputTweet[0].tweet);
        });

        it(`should return the string '${
          FILE_ERROR.CORRUPTED_FILE.constant
        }' for a bad file`, () => {
          const result = userTweets.discernFileContents(
            badFile,
            FILE_TYPE.TWEET
          );
          expect(result).to.be.a('String');
          expect(result).to.equal(FILE_ERROR.CORRUPTED_FILE.constant);
        });
      });
    });

    describe('buildUserTweetRelationship()', () => {
      it('should return an object for a valid user and tweet object input', () => {
        const result = userTweets.buildUserTweetRelationship(
          userFileOutput,
          tweetFileOutput
        );

        const resultTweeters = Object.keys(result);
        const userTweetOuputTweeters = Object.keys(userTweetOuput);
        const resultTweets = Object.values(result);
        const userTweetOuputTweets = Object.values(userTweetOuput);

        expect(result).to.be.a('Object');

        // Tweeters
        expect(resultTweeters.length).to.equal(userTweetOuputTweeters.length);
        expect(resultTweeters[0]).to.equal(userTweetOuputTweeters[0]);
        expect(resultTweeters[1]).to.equal(userTweetOuputTweeters[1]);

        // Tweets
        expect(resultTweets.length).to.equal(userTweetOuputTweets.length);
        expect(resultTweets[0].length).to.equal(userTweetOuputTweets[0].length);
        expect(resultTweets[0][0].count).to.equal(
          userTweetOuputTweets[0][0].count
        );
        expect(resultTweets[0][0].tweet).to.equal(
          userTweetOuputTweets[0][0].tweet
        );
        expect(resultTweets[1].length).to.equal(userTweetOuputTweets[1].length);
      });
    });
  });
};
