import { expect } from 'chai';
import * as readFiles from '../../core/readFiles';
import { setFileDirectory } from '../../utils/utility';
import { FILE_ERROR } from '../../client/src/utils/constants';

const userTestFile = 'user_test.txt';
const tweetTestFile = 'tweet_test.txt';
const UserTestFile_missing = 'user_test_missing.txt';
const tweetTestFile_missing = 'tweet_test_missing.txt';

export default () => {
  const createFilePathArray = setFileDirectory('../test/test_files/');

  return describe('readFiles', () => {
    const testFiles = createFilePathArray(userTestFile, tweetTestFile);
    const testFiles_missing = createFilePathArray(
      UserTestFile_missing,
      tweetTestFile_missing
    );

    const readFilesArray = readFiles.default(testFiles);
    const readFilesArray_missing = readFiles.default(testFiles_missing);

    it('should exist', () => {
      expect(readFiles).to.exist;
    });

    describe('correct files input', () => {
      it('should return an array of length 2', () => {
        expect(readFilesArray).to.be.a('Array');
        expect(readFilesArray.length).to.equal(2);
      });

      it('should return an array with the first paramter a length 2 Promise array', () => {
        expect(readFilesArray[0]).to.be.a('Array');
        expect(readFilesArray[0].length).to.equal(2);
        expect(readFilesArray[0][0]).to.be.a('Promise');
        expect(readFilesArray[0][1]).to.be.a('Promise');
      });

      it('should return an array with an empty second parameter array', () => {
        expect(readFilesArray[1]).to.be.a('Array');
        expect(readFilesArray[1].length).to.equal(0);
      });
    });

    describe('missing files', () => {
      it('should return an array of length 2', () => {
        expect(readFilesArray_missing).to.be.a('Array');
        expect(readFilesArray_missing.length).to.equal(2);
      });

      it('should return an array with a second parameter array of length 2', () => {
        expect(readFilesArray_missing[1]).to.be.a('Array');
        expect(readFilesArray_missing[1].length).to.equal(2);
      });

      it(`should return a second parameter array with string ${
        FILE_ERROR.MISSING_FILE.constant
      } and the file name`, () => {
        expect(readFilesArray_missing[1][0][0]).to.be.a('String');
        expect(readFilesArray_missing[1][0][0]).to.equal(
          FILE_ERROR.MISSING_FILE.constant
        );
        expect(readFilesArray_missing[1][0][1]).to.equal(UserTestFile_missing);
      });
    });
  });
};
