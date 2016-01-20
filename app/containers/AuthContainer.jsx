import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Auth from '../components/Auth';
import * as actionCreators from '../actions/authActions';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    isFetching: auth.isFetching,
    isAuthenticated: auth.isAuthenticated,
    errorMessage: auth.errorMessage,
    showForm: auth.showForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
