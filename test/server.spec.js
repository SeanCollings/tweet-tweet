import utilityTest from './all_tests/utility-test';
import constantsTest from './all_tests/constants-test';
import userTweetsTest from './all_tests/userTweets-test';
import userTest from './all_tests/user-test';
import tweetTest from './all_tests/tweet-test';
import tweetRoutesTest from './all_tests/tweetRoutes-test';
import readFilesTest from './all_tests/readFiles-test';
import extractFileDataTest from './all_tests/extractFileData-test';
import checkForBadFileDataTest from './all_tests/checkForBadFileData-test';

describe('Mocha Server Tests', () => {
  describe('/core/', () => {
    readFilesTest();
    extractFileDataTest();
    checkForBadFileDataTest();
  });
  describe('/routes/', () => {
    tweetRoutesTest();
  });
  describe('/server/', () => {
    userTweetsTest();
    userTest();
    tweetTest();
  });
  describe('/utils/', () => {
    utilityTest();
    constantsTest();
  });
});
