import { setFileDirectory } from '../utils/utility';

const createFilePathArray = setFileDirectory('../upload/');

// Names of files and extension to upload
const files = { user: 'user', tweet: 'tweet' };
const extension = '.txt';

// Used to test different files, correct or otherwise
export const FILES_TO_UPLOAD = {
  CORRECT_FILES: createFilePathArray(
    `${files.user}${extension}`,
    `${files.tweet}${extension}`
  ),
  EMPTY_FILES: createFilePathArray(
    `${files.user}_empty${extension}`,
    `${files.tweet}_empty${extension}`
  ),
  CORRUPT_FILES: createFilePathArray(
    `${files.user}_bad${extension}`,
    `${files.tweet}_bad${extension}`
  ),
  CORRUPT_END_FILES: createFilePathArray(
    `${files.user}_end_bad${extension}`,
    `${files.tweet}_end_bad${extension}`
  ),
  MISSING_FILES: createFilePathArray(
    `${files.user}_missing${extension}`,
    `${files.tweet}_missing${extension}`
  ),
  MIXED_FILES: createFilePathArray(
    `${files.user}${extension}`,
    `${files.tweet}_missing${extension}`
  )
};

export const FILE_TYPE = {
  USER: files.user,
  TWEET: files.tweet
};

export const EXTENSION = {
  EXT: extension
};
