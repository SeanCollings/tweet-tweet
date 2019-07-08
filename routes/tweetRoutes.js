// File names and extension(s) found in '../utils/constants'

import fs from 'fs';
import path from 'path';

import { FILES_TO_UPLOAD, FILE_TYPE, EXTENSION } from '../utils/constants';
import { FILE_ERROR } from '../client/src/utils/constants';
import {
  discernFileContents,
  buildUserTweetRelationship
} from '../server/userTweets';

export default app => {
  app.get('/api/get_tweets', async (req, res) => {
    try {
      const errorsArray = [];

      // Build up promise array to read all necessary files
      const promises = await FILES_TO_UPLOAD.CORRECT_FILES.map(_path => {
        return new Promise((resolve, rej) => {
          fs.readFile(_path.toString(), (err, data) => {
            const basename = path.basename(_path);

            if (err) {
              const errCode =
                err.code === 'ENOENT'
                  ? FILE_ERROR.MISSING_FILE.constant
                  : err.code;
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

      const allFiles = await Promise.all(promises);

      if (errorsArray.length > 0) {
        return res.send({
          error: errorsArray
        });
      }

      let userFileTransformed = null;
      let tweetFileTransformed = null;

      // Read all files and extract required data
      allFiles.forEach(file => {
        switch (file[0]) {
          case FILE_TYPE.USER:
            userFileTransformed = discernFileContents(file[1], FILE_TYPE.USER);
            break;
          case FILE_TYPE.TWEET:
            tweetFileTransformed = discernFileContents(
              file[1],
              FILE_TYPE.TWEET
            );
            break;
        }
      });

      // Send error responce if files have bad data
      const corruptedFilesArr = [];
      if (userFileTransformed === FILE_ERROR.CORRUPTED_FILE.constant) {
        corruptedFilesArr.push([
          FILE_ERROR.CORRUPTED_FILE.constant,
          FILE_TYPE.USER + EXTENSION.EXT
        ]);
      }
      if (tweetFileTransformed === FILE_ERROR.CORRUPTED_FILE.constant) {
        corruptedFilesArr.push([
          FILE_ERROR.CORRUPTED_FILE.constant,
          FILE_TYPE.TWEET + EXTENSION.EXT
        ]);
      }
      if (corruptedFilesArr.length > 0) {
        return res.send({
          error: corruptedFilesArr
        });
      }

      // Send the final user/tweet list to the FE
      return res.send({
        response: buildUserTweetRelationship(
          userFileTransformed,
          tweetFileTransformed
        )
      });
    } catch (err) {
      res.sendStatus(502);
      console.log('/api/get_tweets error:', err);
    }
  });
};
