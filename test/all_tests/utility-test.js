import { expect } from 'chai';
import * as utility from '../../utils/utility';

export default () => {
  return describe('utility', () => {
    it('should exist', () => {
      expect(utility).to.exist;
    });

    describe('setFileDirectory()', () => {
      const fileDirectory = '/directory/';
      const path1 = 'path1.ext';
      const path2 = 'path2.ext';

      it('should return a function', () => {
        const setFileDirectory = utility.setFileDirectory(fileDirectory);
        expect(setFileDirectory).to.be.a('Function');
      });

      it('returns a function that returns an array of 2 paths', () => {
        const setFileDirectory = utility.setFileDirectory(fileDirectory);
        const filePathArray = setFileDirectory(path1, path2);
        expect(filePathArray.length).to.equal(2);
      });
    });

    describe('orderObject()', () => {
      const unordered = { c: 'third', a: 'first', b: 'second' };
      const ordered = { a: 'first', b: 'second', c: 'third' };

      it('should return an ordered object', () => {
        const obj = utility.orderObject(unordered);

        expect(obj).to.be.a('Object');
        expect(Object.keys(obj)[0]).to.equal(Object.keys(ordered)[0]);
        expect(Object.keys(obj)[1]).to.equal(Object.keys(ordered)[1]);
        expect(Object.keys(obj)[2]).to.equal(Object.keys(ordered)[2]);
      });
    });

    describe('splitString()', () => {
      const first = 'first';
      const second = 'second';
      const stringArray = utility.splitString(`${first},${second}`, ',');

      it('should return an array split by a string delimiter', () => {
        expect(stringArray).to.be.a('Array');
        expect(stringArray[0]).to.equal(first);
        expect(stringArray[1]).to.equal(second);
      });
    });

    describe('removeLastElement()', () => {
      const intialString = 'abcdefgh';
      const removedString = 'abcdefg';
      const finalString = utility.removeLastElement(intialString);

      it('should return an string with the last character removed', () => {
        expect(finalString).to.be.a('String');
        expect(finalString).to.equal(removedString);
      });
    });
  });
};
