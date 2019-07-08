import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTweets } from '../actions';

import TweetsDisplay from './TweetsDisplay';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui inverted segment">
          <header className="App-header">
            <h3 className="ui block blue inverted header">Tweet-Tweet</h3>
            <p>View tweets loaded right from the server</p>
            <h4 className="ui horizontal inverted divider">
              <button
                className="ui inverted primary button"
                onClick={this.props.getTweets}
              >
                Load Tweets
              </button>
            </h4>
            <TweetsDisplay />
          </header>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getTweets }
)(App);
