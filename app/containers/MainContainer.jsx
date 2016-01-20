import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { redirectToLogin } from '../actions/authActions';

class Main extends Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.goToLogin();
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToLogin: () => {
      dispatch(redirectToLogin());
    }
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Main);
