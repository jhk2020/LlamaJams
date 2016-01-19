import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import * as actionCreators from '../actions/homeActions';

function mapStateToProps(state) {
  const { home } = state;
  return {
    isFetching: home.isFetching,
    isAuthenticated: home.isAuthenticated,
    errorMessage: home.errorMessage,
    showForm: home.showForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
