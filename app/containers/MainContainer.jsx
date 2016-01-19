import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'hello'
    }
  }
  componentWillMount() {
    if (!localStorage.getItem('id_token')) {
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


function mapDispatchToProps(dispatch) {
  return {
    goToLogin: () => {
      dispatch(routeActions.push('/login'));
    }
  }
}

export default connect (
  null,
  mapDispatchToProps
)(Main);
