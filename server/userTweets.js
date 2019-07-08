import { orderObject, removeLastElement } from '../utils/utility';
import { FILE_TYPE } from '../utils/constants';
import { FILE_ERROR } from '../client/src/utils/constants';
import { discernUserFile } from './user';
import { initialiseTweets } from './tweet';

/**
 * Converts a file string into an object depending on the file type
 *
 * Returns: Object
 *
 * @param {string} fileContents The contents of the file in string format
 * @param {string} fileType The type of the file. Either 'user' or 'tweet'
 */
export const discernFileContents = (fileContents, fileType) => {
  let contents = {};
  let loopedString = '';
  let discernTweetFile = null;

  if (fileType === FILE_TYPE.TWEET) discernTweetFile = initialiseTweets();

  for (let i = 0; i < fileContents.length; i++) {
    loopedString += fileContents.charAt(i);

    // Cater for newline and end of file including multiple newlines and spaces
    if (
      (fileContents.charAt(i) === '¦' && loopedString.length > 1) ||
      (i === fileContents.length - 1 && loopedString.trim().length > 0)
    ) {
      fileContents.charAt(i) === '¦'
        ? (loopedString = removeLastElement(loopedString))
        : null;

      if (fileType === FILE_TYPE.USER && loopedString.includes('follows')) {
        contents = { ...discernUserFile(loopedString, contents) };
        loopedString = '';
      } else if (fileType === FILE_TYPE.TWEET && loopedString.includes('>')) {
        contents = { ...discernTweetFile(loopedString, contents) };
        loopedString = '';
      } else {
        return FILE_ERROR.CORRUPTED_FILE.constant;
      }
    } else if (fileContents.charAt(i) === '¦' && loopedString.length === 1) {
      loopedString = '';
    }
  }

  return contents;
};

/**
 * Builds up the final object of mapped users to their respective tweets
 *
 * Returns: Object
 *
 * @param {object} userFileData The final user object
 * @param {object} tweetFileData The final tweet object
 */
export const buildUserTweetRelationship = (userFileData, tweetFileData) => {
  const orderedUsers = orderObject(userFileData);
  const finalUserList = {};

  Object.keys(orderedUsers).forEach(user => {
    const userTweetsArray = [];

    for (let i = 0; i < orderedUsers[user].length; i++) {
      if (tweetFileData[orderedUsers[user][i]]) {
        userTweetsArray.push(...tweetFileData[orderedUsers[user][i]]);
      }
    }
    finalUserList[user] = userTweetsArray;
  });

  return finalUserList;
};
