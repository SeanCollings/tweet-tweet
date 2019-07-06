import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { FILE_ERROR } from '../utils/constants';
import { getErrorMessages } from '../utils/utility';

class TweetsDisplay extends Component {
  renderErrors = errors => {
    const errorsArray = [];
    const errorMessages = getErrorMessages();

    for (let i = 0; i < errors.length; i++) {
      const errorMessage = `'${errors[i][1]}' ${errorMessages[errors[i][0]]}`;
      errorsArray.push(errorMessage);
    }

    return (
      <div>
        <p>There have been errors</p>
        <ul style={{ padding: '0px' }}>
          {errorsArray.map((err, index) => {
            return (
              <li key={index} style={{ listStyle: 'none' }}>
                {err}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  orderTweets = tweetArray => {
    tweetArray.sort((a, b) => {
      if (a.order > b.order) return 1;
      else return -1;
    });

    return tweetArray;
  };

  renderTweets = tweets => {
    return Object.keys(tweets).map(key => {
      const tweetsArray = [];
      if (tweets[key].length > 1) {
        tweetsArray.push(...this.orderTweets(tweets[key]));
      } else if (tweets[key].length === 1) {
        tweetsArray.push(...tweets[key]);
      }

      return (
        <div key={key}>
          {key}
          <div style={{ marginLeft: '72px' }}>
            <ul style={{ padding: '0px' }}>
              {tweetsArray.length > 0
                ? tweetsArray.map((tweet, index) => {
                    return (
                      <li key={index} style={{ listStyle: 'none' }}>
                        {tweet.tweet}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      );
    });
  };

  render() {
    const { tweets } = this.props.tweets;

    if (!tweets) {
      return <div>No tweets loaded, yet...</div>;
    }

    if (tweets.response) {
      return (
        <div style={{ width: '90%', textAlign: 'left' }}>
          {this.renderTweets(tweets.response)}
        </div>
      );
    } else if (tweets.error) {
      return <div>{this.renderErrors(tweets.error)}</div>;
    }

    return <div>Something went wrong!</div>;
  }
}

function mapStateToProps({ tweets }) {
  return { tweets };
}

export default connect(mapStateToProps)(TweetsDisplay);
