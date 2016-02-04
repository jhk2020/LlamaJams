import React from 'react';

const Header = ({ playlistName, url }) => (
  <div id="header-container">
    <header className="wrapper clearfix">
      <h1 className="title-home">{url !== '/' ? playlistName : 'L L A M A J A M S'}</h1>
    </header>
  </div>
)

export default Header;
