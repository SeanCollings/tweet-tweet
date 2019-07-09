import { expect } from 'chai';
import { FILE_TYPE } from '../../utils/constants';
import * as extractFileData from '../../core/extractFileData';

export default () => {
  return describe('extractFileData', () => {
    const allFiles = [
      [FILE_TYPE.USER, 'Name1 follows Name2¦'],
      [FILE_TYPE.TWEET, 'Name1> message¦']
    ];
    const fileData = extractFileData.default(allFiles);

    it('should exist', () => {
      expect(extractFileData).to.exist;
    });

    it('should return an object of length 2', () => {
      expect(fileData).to.be.a('Object');
      expect(Object.keys(fileData).length).to.equal(2);
    });
  });
};
