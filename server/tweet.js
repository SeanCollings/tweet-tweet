import { splitString } from '../utils/utility';

/**
 * Maps an object from the 'tweet' file string and builds an object of tweeter to
 * their respective tweets and the order in which the tweet occured
 *
 * Returns: Object
 */
export const initialiseTweets = () => {
  let order = 0;

  return (loopedString, fileContents) => {
    const contents = { ...fileContents };

    const tweeter = splitString(loopedString, '>')[0];
    const tweet = {
      order,
      tweet: `@${tweeter}: ${splitString(loopedString, '> ')[1]}`
    };

    contents[tweeter] = buildAllTweets(contents[tweeter], tweet);

    order++;
    loopedString = '';

    return contents;
  };
};

/**
 * Adds new tweets to old tweets
 *
 * Returns: Object
 *
 * @param {object} oldTweets Existing tweets of the object
 * @param {object} newTweet New tweets to be added to the object
 */
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
