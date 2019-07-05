import path from 'path';
import { FILE_TYPE } from './constants';

export const setFileDirectory = uploadDirectory => {
  return (path1, path2) => {
    return [
      path.join(__dirname, `${uploadDirectory}${path1}`),
      path.join(__dirname, `${uploadDirectory}${path2}`)
    ];
  };
};

export const readUserFile = fileContents => {
  const userFileContents = new Set();

  let loopedString = '';
  for (let i = 0; i < fileContents.length; i++) {
    if (fileContents.charAt(i) === '\n') {
      loopedString = '';
    }

    if (fileContents.charAt(i) === ' ' && !loopedString.includes('follows')) {
      if (!userFileContents.has(loopedString)) {
        userFileContents.add(loopedString);
        console.log('String Added!');
      }

      loopedString = '';
    }

    loopedString += fileContents.charAt(i);
    console.log(loopedString);
  }

  // console.log(userFileContents);

  return fileContents;
};

export const readTweetFile = fileContents => {
  const tweetContents = {};

  return fileContents;
};

export const readFileContents = (type, fileContents) => {
  const contents = {};
  switch (type) {
    case FILE_TYPE.USER:
      return fileContents;
    case FILE_TYPE.TWEET:
      return fileContents;
  }
};
