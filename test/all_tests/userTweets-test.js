import { expect } from 'chai';
import { FILE_TYPE } from '../../utils/constants';
import { FILE_ERROR } from '../../client/src/utils/constants';

import * as userTweets from '../../server/userTweets';

export default () => {
  return describe('userTweets', () => {
    it('should exist', () => {
      expect(userTweets).to.exist;
    });

    describe('discernFileContents()', () => {
      const userFileInput = 'Name1 follows Name2';
      const userFileOutput = { Name1: ['Name1', 'Name2'], Name2: ['Name2'] };
      const tweetFileInput = 'Name1> Message';
      const tweetFileOutput = {
        Name1: [{ order: 0, tweet: '@Name1: Message' }]
      };
      const badFile = 'bad_file';

      describe(`file type ${FILE_TYPE.USER}`, () => {
        it('should return a valid user object for a correct file', () => {
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
        it('should return a valid tweet object for a correct file', () => {
          const result = userTweets.discernFileContents(
            tweetFileInput,
            FILE_TYPE.TWEET
          );
          // console.log(result);
          expect(result).to.be.a('Object');
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
  });
};
