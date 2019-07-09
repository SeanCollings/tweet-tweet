import utilityTest from './all_tests/utility-test';
import constantsTest from './all_tests/constants-test';
import userTweetsTest from './all_tests/userTweets-test';
import userTest from './all_tests/user-test';
import tweetTest from './all_tests/tweet-test';

describe('Mocha Server Tests', () => {
  describe('/utils/', () => {
    utilityTest();
    constantsTest();
  });
  describe('/server/', () => {
    userTweetsTest();
    userTest();
    tweetTest();
  });
});
