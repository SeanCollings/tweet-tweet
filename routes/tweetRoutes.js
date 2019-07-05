import fs from 'fs';
import path from 'path';

import { FILES_TO_UPLOAD, FILE_TYPE } from '../utils/constants';
import { FILE_ERROR } from '../client/src/utils/constants';
import { readUserFile, readTweetFile } from '../utils/utility';

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
                err.code === 'ENOENT' ? FILE_ERROR.MISSING_FILE : err.code;
              errorsArray.push([errCode, basename]);

              resolve('');
            } else {
              if (data.length === 0)
                errorsArray.push([FILE_ERROR.EMPTY_FILE, basename]);

              const fileType = basename.includes(FILE_TYPE.USER)
                ? FILE_TYPE.USER
                : FILE_TYPE.TWEET;

              resolve([fileType, data.toString()]);
            }
          });
        }).catch(err => console.log('ReadFile error:', err.message));
      });

      const allFiles = await Promise.all(promises);

      if (errorsArray.length > 0) {
        return res.send({
          response: errorsArray
        });
      }

      allFiles.forEach(file => {
        switch (file[0]) {
          case FILE_TYPE.USER:
            const testUser = readUserFile(file[1]);
            // console.log(testUser);
            break;
          case FILE_TYPE.TWEET:
            const testTweet = readTweetFile(file[1]);
            // console.log(testTweet);
            break;
        }
      });

      return res.send({ response: `Hello There ${Math.random().toFixed(3)}` });
    } catch (err) {
      res.status(502);
      console.log('catch', err.message);
    }
  });
};
