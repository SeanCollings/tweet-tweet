import { expect } from 'chai';
import { FILE_ERROR } from '../../client/src/utils/constants';
import { FILE_TYPE, EXTENSION } from '../../utils/constants';
import * as checkForBadFileData from '../../core/checkForBadFileData';

export default () => {
  return describe('checkForBadFileData', () => {
    it('should exist', () => {
      expect(checkForBadFileData).to.exist;
    });
    const goodFiles = {
      user: { Name1: ['Name1', 'Name2'], Name2: [] },
      tweet: { Name1: [{ order: 0, tweet: 'Message' }] }
    };
    const badFiles = { user: 'corrupted_file', tweet: 'corrupted_file' };
    const goodFileData = checkForBadFileData.default(goodFiles);
    const badFileData = checkForBadFileData.default(badFiles);

    describe('correct data', () => {
      it('should return an empty array', () => {
        expect(goodFileData.length).to.equal(0);
        expect(goodFileData).to.be.a('Array');
      });
    });

    describe('bad data', () => {
      it('should return an array of length 2', () => {
        expect(badFileData.length).to.equal(2);
        expect(badFileData).to.be.a('Array');
      });

      it(`should contain the error message '${
        FILE_ERROR.CORRUPTED_FILE.constant
      }' for each file`, () => {
        expect(badFileData[0][0]).to.equal(FILE_ERROR.CORRUPTED_FILE.constant);
        expect(badFileData[0][1]).to.equal(FILE_TYPE.USER + EXTENSION.EXT);
        expect(badFileData[1][0]).to.equal(FILE_ERROR.CORRUPTED_FILE.constant);
        expect(badFileData[1][1]).to.equal(FILE_TYPE.TWEET + EXTENSION.EXT);
      });
    });
  });
};
