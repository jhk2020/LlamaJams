import React, { Component } from 'react';

export default class Searchbar extends Component {
  componentWillReceiveProps(nextProps) {
    this.props.fetchFromSC(nextProps.searchbarQuery);
  }

  render() {
    const { searchbarQuery, performQuery, clearSearch } = this.props;
    return (
       <div className='searchbar-container'>
         <div className='searchbar'>
           <form onSubmit={this.handleSubmit}>
             <input  name='query'
                     value={searchbarQuery}
                     type='text'
                     placeholder='Search mothafucka'
                     onChange={(event) => {
                       performQuery(event);
                     }}
                     className='form-control'
                     autoComplete='false' />
           </form>
         </div>
       </div>
     )
  }
}
