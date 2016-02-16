import React, { Component } from 'react';

export default class Searchbar extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchbarQuery === '') {
      this.props.actions.clearQuery();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.actions.fetchSongs(this.props.searchbarQuery);
  };

  render() {
    const { searchbarQuery, actions } = this.props;
    return <div className='searchbar-container'>
     <div className='searchbar'>
       <form onSubmit={this.handleSubmit}>
         <input
             autoComplete='off'
             id='searchbar-input'
             name='query'
             onChange={(event) => {
               actions.updateQuery(event.target.value);
             }}
             type='text'
             value={searchbarQuery}
         />
       </form>
     </div>
   </div>
  }
}
