import React, { Component } from 'react';
import { connect } from 'react-redux';

// import logo from '../logo.svg';
import { getTest } from '../actions';
import './App.css';

class App extends Component {
  render() {
    const { tweets } = this.props.tweets;

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="/api/test"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hello There
          </a>
          <button onClick={this.props.getTest}>Load</button>
          <div>{tweets ? JSON.stringify(tweets) : null}</div>
        </header>
      </div>
    );
  }
}

function mapStateToProps({ tweets }) {
  return { tweets };
}

export default connect(
  mapStateToProps,
  { getTest }
)(App);
