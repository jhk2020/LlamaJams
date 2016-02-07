import React, { Component } from 'react';

export default class Searchbar extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchbarQuery === '') {
      this.props.actions.clearQuery();
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.actions.fetchSongs(this.props.searchbarQuery);
  };

  render() {
    const { searchbarQuery, actions } = this.props;
    return (
       <div className='searchbar-container'>
         <div className='searchbar'>
           <form onSubmit={this.submitHandler}>
             <input  name='query'
                     value={searchbarQuery}
                     type='text'
                     onChange={(event) => {
                       actions.updateQuery(event.target.value);
                     }}
                     id='searchbar-input'
                     autoComplete='off' />
           </form>
         </div>
       </div>
     )
  }
}
