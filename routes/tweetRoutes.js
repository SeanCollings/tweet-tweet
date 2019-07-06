import fs from 'fs';
import path from 'path';

import { FILES_TO_UPLOAD, FILE_TYPE, EXTENSION } from '../utils/constants';
import { FILE_ERROR } from '../client/src/utils/constants';
import {
  readUserFile,
  readTweetFile,
  buildUserTweetRelationship
} from '../utils/utility';

export default app => {
  app.get('/api/get_tweets', async (req, res) => {
    try {
      const errorsArray = [];

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

              resolve([fileType, data.toString().replace(/\r?\n|\r/g, '¦')]);
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

      allFiles.forEach(file => {
        switch (file[0]) {
          case FILE_TYPE.USER:
            userFileTransformed = readUserFile(file[1]);
            // console.log(userFileTransformed);
            break;
          case FILE_TYPE.TWEET:
            tweetFileTransformed = readTweetFile(file[1]);
            console.log(tweetFileTransformed);
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

      // console.log('userFileTransformed', userFileTransformed);
      // console.log('tweetFileTransformed', tweetFileTransformed);
      return res.send({
        response: buildUserTweetRelationship(
          userFileTransformed,
          tweetFileTransformed
        )
      });

      // return res.send({ response: `Hello There ${Math.random().toFixed(3)}` });
    } catch (err) {
      res.sendStatus(502);
      console.log('/api/get_tweets error:', err);
    }
  });
};
