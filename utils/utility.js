import path from 'path';
import { FILE_TYPE } from './constants';
import { FILE_ERROR } from '../client/src/utils/constants';

export const setFileDirectory = uploadDirectory => {
  return (path1, path2) => {
    return [
      path.join(__dirname, `${uploadDirectory}${path1}`),
      path.join(__dirname, `${uploadDirectory}${path2}`)
    ];
  };
};

export const discernFileContents = (fileContents, fileType) => {
  const contents = {};
  let loopedString = '';

  for (let i = 0; i < fileContents.length; i++) {
    loopedString += fileContents.charAt(i);

    if (fileContents.charAt(i) === '¦' && loopedString.length > 1) {
      loopedString = removeLastElement(loopedString);

      contents = discernUserFile(loopedString);

      // if (loopedString.includes('follows')) {
      //   const follower = splitString(loopedString, ' follows')[0];
      //   const followees = createFollowees(
      //     splitString(loopedString, 'follows ')[1]
      //   );

      //   contents[follower] = buildAllFollowees(
      //     contents[follower],
      //     followees
      //   );

      //   loopedString = '';
      // } else {
      //   return 'This file is bad, duh!';
      // }
    } else if (fileContents.charAt(i) === '¦' && loopedString.length === 1) {
      loopedString = '';
    }
  }

  return contents;
};

const discernUserFile = string => {
  // if (fileContents.charAt(i) === '¦' && loopedString.length > 1) {
  //   loopedString = removeLastElement(loopedString);
  //   if (loopedString.includes('follows')) {
  //     const follower = splitString(loopedString, ' follows')[0];
  //     const followees = createFollowees(
  //       splitString(loopedString, 'follows ')[1]
  //     );
  //     contents[follower] = buildAllFollowees(
  //       contents[follower],
  //       followees
  //     );
  //     loopedString = '';
  //   } else {
  //     return 'This file is bad, duh!';
  //   }
};

export const readUserFile = fileContents => {
  const userFileContents = {};
  let loopedString = '';
  // const allUsersSet = new Set();

  for (let i = 0; i < fileContents.length; i++) {
    loopedString += fileContents.charAt(i);

    if (fileContents.charAt(i) === '¦' && loopedString.length > 1) {
      loopedString = removeLastElement(loopedString);
      if (loopedString.includes('follows')) {
        // console.log(loopedString);
        const follower = splitString(loopedString, ' follows')[0];
        const followees = createFollowees(
          splitString(loopedString, 'follows ')[1]
        );

        // console.log('follower', follower);
        // console.log('followees', followees);

        userFileContents[follower] = [follower];
        userFileContents[follower] = buildAllFollowees(
          userFileContents[follower],
          followees
        );

        if (followees.length > 0) {
          followees.forEach(followee => {
            if (
              followee.trim().length > 0 &&
              !userFileContents[followee.trim()]
            ) {
              userFileContents[followee.trim()] = [followee.trim()];
            }
          });
        }

        loopedString = '';
      } else {
        return FILE_ERROR.CORRUPTED_FILE.constant;
      }
    } else if (fileContents.charAt(i) === '¦' && loopedString.length === 1) {
      loopedString = '';
    }
  }

  // console.log('set', allUsersSet);
  // console.log('test', arrayTest);
  // return [userFileContents, [...allUsersSet]];
  // console.log(userFileContents);
  return userFileContents;
};

export const readTweetFile = fileContents => {
  const tweetFileContents = {};
  let loopedString = '';
  let order = 0;

  for (let i = 0; i < fileContents.length; i++) {
    loopedString += fileContents.charAt(i);

    if (fileContents.charAt(i) === '¦' && loopedString.length > 1) {
      loopedString = removeLastElement(loopedString);

      if (loopedString.includes('>')) {
        const tweeter = splitString(loopedString, '>')[0];
        const tweet = {
          order,
          tweet: `@${tweeter}: ${splitString(loopedString, '> ')[1]}`
        };

        tweetFileContents[tweeter] = buildAllTweets(
          tweetFileContents[tweeter],
          tweet
        );

        order++;
        loopedString = '';
      } else {
        return FILE_ERROR.CORRUPTED_FILE.constant;
      }

      loopedString = '';
    } else if (fileContents.charAt(i) === '¦' && loopedString.length === 1) {
      loopedString = '';
    }
  }
  // console.log(tweetFileContents);
  return tweetFileContents;
};

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

  // console.log(finalUserList);
  return finalUserList;
};

// export const readFileContents = (type, fileContents) => {
//   const contents = {};
//   switch (type) {
//     case FILE_TYPE.USER:
//       return fileContents;
//     case FILE_TYPE.TWEET:
//       return fileContents;
//   }
// };

const orderObject = obj => {
  const orderedObject = {};

  Object.keys(obj)
    .sort()
    .forEach(key => {
      orderedObject[key] = obj[key];
    });

  return orderedObject;
};

// const isCapitalised = word => {
//   return /[A-Z]/.test(word[0]);
// };

// const removeFromString = (string, toRemove) => {
//   return string.replace(toRemove, '');
// };

const createFollowees = followees => {
  if (followees.includes(',')) {
    // console.log(splitString(followees, ','));
    return splitString(followees, ',');
  } else {
    return [followees];
  }
};

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

const buildAllTweets = (oldTweets, newTweet) => {
  const tweetArray = [];

  if (oldTweets) {
    oldTweets.forEach(tweet => {
      tweetArray.push(tweet);
    });
  }

  if (newTweet) {
    tweetArray.push(newTweet);
  }

  return tweetArray;
};

const splitString = (string, stringDefiner) => {
  // console.log(string, stringDefiner);
  return string.split(stringDefiner);
};

const removeLastElement = string => {
  return string.substring(0, string.length - 1);
};
