import { FILE_ERROR } from '../client/src/utils/constants';
import { FILE_TYPE, EXTENSION } from '../utils/constants';

/**
 * Checks if any file in the transformedFiles paramater  is of a certain
 * FILE_ERROR type and adds it to an corrupted files array
 *
 * Returns: Array
 *
 * @param {Object} transformedFiles An object of transformed files
 */
export default transformedFiles => {
  const corruptedFilesArr = [];

  if (transformedFiles[FILE_TYPE.USER] === FILE_ERROR.CORRUPTED_FILE.constant) {
    corruptedFilesArr.push([
      FILE_ERROR.CORRUPTED_FILE.constant,
      FILE_TYPE.USER + EXTENSION.EXT
    ]);
  }
  if (
    transformedFiles[FILE_TYPE.TWEET] === FILE_ERROR.CORRUPTED_FILE.constant
  ) {
    corruptedFilesArr.push([
      FILE_ERROR.CORRUPTED_FILE.constant,
      FILE_TYPE.TWEET + EXTENSION.EXT
    ]);
  }

  return corruptedFilesArr;
};
