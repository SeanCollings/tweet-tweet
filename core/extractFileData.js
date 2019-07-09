import { FILE_TYPE } from '../utils/constants';
import { discernFileContents } from '../server/userTweets';

/**
 * Converts a files' contents in string format into a transformed file object
 * depending on the files type
 *
 * Returns: Object
 *
 * @param {Array} allFiles An Array of file strings
 */
export default allFiles => {
  const transformedFiles = {};

  allFiles.forEach(file => {
    switch (file[0]) {
      case FILE_TYPE.USER:
        transformedFiles[FILE_TYPE.USER] = discernFileContents(
          file[1],
          FILE_TYPE.USER
        );
        break;
      case FILE_TYPE.TWEET:
        transformedFiles[FILE_TYPE.TWEET] = discernFileContents(
          file[1],
          FILE_TYPE.TWEET
        );
        break;
    }
  });

  return transformedFiles;
};
