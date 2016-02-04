import React, { Component } from 'react';

export default class Searchbar extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchbarQuery === '') {
      this.props.clearSearch();
    }
  }

  submitHandler(e) {
    e.preventDefault();
    this.props.fetchFromSC(this.props.searchbarQuery);
  }

  render() {
    const { searchbarQuery, updateQuery } = this.props;
    return (
       <div className='searchbar-container'>
         <div className='searchbar'>
           <form onSubmit={this.submitHandler.bind(this)}>
             <input  name='query'
                     value={searchbarQuery}
                     type='text'
                     onChange={(event) => {
                       updateQuery(event);
                     }}
                     id='searchbar-input'
                     autoComplete='off' />
           </form>
         </div>
       </div>
     )
  }
}
