import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getErrorMessages } from '../utils/utility';
import './css/TweetsDisplay.css';

class TweetsDisplay extends Component {
  renderErrors = errors => {
    const errorsArray = [];
    const errorMessages = getErrorMessages();

    for (let i = 0; i < errors.length; i++) {
      const errorMessage = {
        fileName: `${errors[i][1]}`,
        errorType: `${errorMessages[errors[i][0]]}`
      };
      errorsArray.push(errorMessage);
    }

    return (
      <div>
        <p className="ui red center error">There have been errors</p>
        <div className="ui list inverted">
          {errorsArray.map((err, index) => {
            return (
              <div key={index} className="item tweet-error">
                <i className="exclamation circle icon" />
                <div className="content">
                  <div className="header">{err.errorType}</div>
                  <div className="description">{err.fileName}</div>
                  <div className="list" />
                </div>
              </div>
            );
          })}
        </div>
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
    if (tweets.length === 0) return <div>No tweets to display</div>;

    return Object.keys(tweets).map(key => {
      const tweetsArray = [];
      if (tweets[key].length > 1) {
        tweetsArray.push(...this.orderTweets(tweets[key]));
      } else if (tweets[key].length === 1) {
        tweetsArray.push(...tweets[key]);
      }

      return (
        <div className="item tweet-follower" key={key}>
          <i className="twitter icon" />
          <div className="content">
            <div className="header">{key}</div>
            <div className="list">
              {tweetsArray.length > 0
                ? tweetsArray.map((tweet, index) => {
                    return (
                      <div className="item tweet-message" key={index}>
                        <i className="comment icon tweet" />
                        <div className="content">
                          <div className="description">{tweet.tweet}</div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="ui divider" />
        </div>
      );
    });
  };

  render() {
    const {
      tweets: { tweets },
      networkResponse: { response }
    } = this.props;

    if (!tweets) {
      return (
        <div className={response ? 'error' : 'no-tweets'}>
          {response ? response : 'No tweets loaded...'}
        </div>
      );
    }

    if (tweets.response) {
      return (
        <div className="ui list inverted">
          {this.renderTweets(tweets.response)}
        </div>
      );
    } else if (tweets.error) {
      return <div>{this.renderErrors(tweets.error)}</div>;
    }

    return <div className="error">Something went wrong!</div>;
  }
}

function mapStateToProps({ tweets, networkResponse }) {
  return { tweets, networkResponse };
}

export default connect(mapStateToProps)(TweetsDisplay);
