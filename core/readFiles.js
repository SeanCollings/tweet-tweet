import fs from 'fs';
import path from 'path';

import { FILE_TYPE } from '../utils/constants';
import { FILE_ERROR } from '../client/src/utils/constants';

/**
 * Builds a promise array of strings from reading in an array of files.
 * Catchs missing files and empty files
 *
 * Returns: Array
 *
 * @param {Array} filesToUpload An Array of file paths to read in
 */
export default filesToUpload => {
  const errorsArray = [];

  const files = filesToUpload.map(_path => {
    return new Promise((resolve, rej) => {
      fs.readFile(_path.toString(), (err, data) => {
        const basename = path.basename(_path);

        if (err) {
          const errCode =
            err.code === 'ENOENT' ? FILE_ERROR.MISSING_FILE.constant : err.code;
          errorsArray.push([errCode, basename]);

          resolve('');
        } else {
          if (data.length === 0)
            errorsArray.push([FILE_ERROR.EMPTY_FILE.constant, basename]);

          const fileType = basename.includes(FILE_TYPE.USER)
            ? FILE_TYPE.USER
            : FILE_TYPE.TWEET;

          // Replace \n and \r characters with a non-ascii character delimiter
          resolve([
            fileType,
            data.toString().replace(/(?:\\[rn]|[\r\n]+)+/g, '¦')
          ]);
        }
      });
    }).catch(err => console.log('ReadFile error:', err));
  });

  return [files, errorsArray];
};
