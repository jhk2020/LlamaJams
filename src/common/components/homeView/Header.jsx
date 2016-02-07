import React from 'react';

const Header = ({ playlistName }) => (
  <div id="header-container">
    <header className="wrapper clearfix">
      <h1 className="title-home">{playlistName ? playlistName : 'L L A M A J A M S'}</h1>
    </header>
  </div>
)

export default Header;
