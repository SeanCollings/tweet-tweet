import { setFileDirectory } from '../utils/utility';

const createFilePathArray = setFileDirectory('../upload/');

// Names of files to upload
const files = { user: 'user', tweet: 'tweet' };

// Used to test different files, correct or otherwise
export const FILES_TO_UPLOAD = {
  CORRECT_FILES: createFilePathArray(`${files.user}.txt`, `${files.tweet}.txt`),
  EMPTY_FILES: createFilePathArray(
    `${files.user}_empty.txt`,
    `${files.tweet}_empty.txt`
  ),
  CORRUPT_FILES: createFilePathArray(
    `${files.user}_bad.txt`,
    `${files.tweet}_bad.txt`
  ),
  CORRUPT_END_FILES: createFilePathArray(
    `${files.user}_end_bad.txt`,
    `${files.tweet}_end_bad.txt`
  ),
  MISSING_FILES: createFilePathArray(
    `${files.user}_missing.txt`,
    `${files.tweet}_missing.txt`
  ),
  MIXED_FILES: createFilePathArray(
    `${files.user}.txt`,
    `${files.tweet}_missing.txt`
  )
};

export const FILE_TYPE = {
  USER: files.user,
  TWEET: files.tweet
};
