// File names and extension(s) found in '../utils/constants'

import { FILES_TO_UPLOAD, FILE_TYPE } from '../utils/constants';
import { buildUserTweetRelationship } from '../server/userTweets';
import filesToUpload from '../core/readFiles';
import checkForBadFileData from '../core/checkForBadFileData';
import extractFileData from '../core/extractFileData';

export default app => {
  app.get('/api/get_tweets', async (req, res) => {
    try {
      // Build up promise array to read all necessary files
      // Select FILES_TO_UPLOAD type to test different scenarios
      const promises = await filesToUpload(FILES_TO_UPLOAD.CORRECT_FILES);

      // Create array results for all promises
      const allFiles = await Promise.all(promises[0]);

      // If a file is bad, notify the user
      if (promises[1].length > 0) {
        return res.send({
          error: promises[1]
        });
      }

      const transformedFiles = extractFileData(allFiles);
      const corruptedFilesArr = checkForBadFileData(transformedFiles);

      // Send error responce if files have bad data
      if (corruptedFilesArr.length > 0) {
        return res.send({
          error: corruptedFilesArr
        });
      }

      // Send the final user/tweet list to the FE
      return res.send({
        response: buildUserTweetRelationship(
          transformedFiles[FILE_TYPE.USER],
          transformedFiles[FILE_TYPE.TWEET]
        )
      });
    } catch (err) {
      res.sendStatus(502);
      console.log('/api/get_tweets error:', err);
    }
  });
};
