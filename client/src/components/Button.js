import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-advanced';
import MiniLoader from 'react-loader-spinner';

class Button extends Component {
  spinner = (
    <span>
      <MiniLoader type="TailSpin" color="#FFFFFF" height={36} width={36} />
    </span>
  );

  render() {
    const { loader, buttonText, handleClick } = this.props;

    return (
      <Loader
        show={loader.show}
        message={this.spinner}
        backgroundStyle={{ backgroundColor: '' }}
      >
        <button
          className="ui inverted primary button"
          style={{ opacity: loader.show ? '0.5' : '1' }}
          onClick={handleClick}
        >
          {buttonText}
        </button>
      </Loader>
    );
  }
}

function mapStateToProps({ loader }) {
  return { loader };
}

export default connect(mapStateToProps)(Button);
