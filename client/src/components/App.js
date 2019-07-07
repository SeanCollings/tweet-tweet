import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTweets } from '../actions';

import TweetsDisplay from './TweetsDisplay';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Click the button to load Tweets</p>
          <button onClick={this.props.getTweets}>Load Tweets</button>
          <TweetsDisplay />
        </header>
      </div>
    );
  }
}

export default connect(
  null,
  { getTweets }
)(App);
