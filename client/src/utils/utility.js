import { FILE_ERROR } from './constants';

export const getErrorMessages = () => {
  const errorList = {};

  Object.keys(FILE_ERROR).forEach(key => {
    errorList[FILE_ERROR[key].constant] = FILE_ERROR[key].message;
  });

  return errorList;
};
