import { splitString } from '../utils/utility';

/**
 * Constructs the follower and followees object built from the uploaded
 * user file in string format
 *
 * Returns: Object
 *
 * @param {string} loopedString An instance of the user file contents in string format
 * @param {object} fileContents An instance of the mapped user object
 */
export const discernUserFile = (loopedString, fileContents) => {
  const contents = { ...fileContents };

  const follower = splitString(loopedString, ' follows')[0];
  const followees = createFollowees(splitString(loopedString, 'follows ')[1]);

  contents[follower] = [follower];
  contents[follower] = buildAllFollowees(contents[follower], followees);

  if (followees.length > 0) {
    followees.forEach(followee => {
      if (followee.trim().length > 0 && !contents[followee.trim()]) {
        contents[followee.trim()] = [followee.trim()];
      }
    });
  }

  return contents;
};

/**
 * Splits the followees for a user into an array
 *
 * Returns: Array of followees for a user
 *
 * @param {object} followees An object of followees for a user
 */
const createFollowees = followees => {
  if (followees.includes(',')) {
    return splitString(followees, ',');
  } else {
    return [followees];
  }
};

/**
 * Adds new followees to exising followees for a user
 *
 * Returns: Object
 *
 * @param {object} oldFollowees Existing followees object for a user
 * @param {object} newFollowees New followees object to append to existing followees
 */
const buildAllFollowees = (oldFollowees, newFollowees) => {
  const followeeSet = new Set();

  if (oldFollowees) {
    oldFollowees.forEach(followee => {
      if (followee.trim().length !== 0) {
        followeeSet.add(followee);
      }
    });
  }

  if (newFollowees) {
    newFollowees.forEach(followee => {
      if (followee.trim().length !== 0) {
        followeeSet.add(followee.trim());
      }
    });
  }

  return [...followeeSet];
};
