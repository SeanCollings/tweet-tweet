import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTweets, clearTweets, showLoader } from '../actions';

import TweetsDisplay from './TweetsDisplay';
import Button from './Button';
import './css/App.css';

const styles = {
  ribbonLabel: { position: 'absolute', left: '2px', top: '20px' },
  header: { marginTop: '0px' }
};

class App extends Component {
  componentDidUpdate() {
    const {
      tweets: { tweets }
    } = this.props;

    if (tweets) this.props.showLoader(false);
  }

  getTweets = () => {
    this.props.getTweets();
    this.props.showLoader(true);
  };

  render() {
    const { tweets } = this.props;

    return (
      <div className="App">
        <div className="ui inverted segment">
          <header className="App-header">
            <a
              className="ui red ribbon label test"
              style={styles.ribbonLabel}
              href="https://github.com/SeanCollings/tweet-tweet"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sean Collings
            </a>
            <h3
              className="ui block blue inverted header center"
              style={styles.header}
            >
              Tweet-Tweet
            </h3>
            <p className="center">View tweets loaded from the server</p>
            <h4 className="ui horizontal inverted divider ">
              <Button
                buttonText={!tweets.tweets ? 'Load Tweets' : 'Clear'}
                handleClick={
                  !tweets.tweets ? this.getTweets : this.props.clearTweets
                }
              />
            </h4>
            <div className="all-content">
              <TweetsDisplay />
            </div>
          </header>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ tweets }) {
  return { tweets };
}

export default connect(
  mapStateToProps,
  { getTweets, clearTweets, showLoader }
)(App);
