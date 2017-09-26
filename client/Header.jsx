import React from 'react';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul className="list-inline">
        <button><li><Link to="/">Overview</Link></li></button>
        <button><li><Link to="/builds">Build Data</Link></li></button>
        <button><li><Link to="/recommendations">Recommendations</Link></li></button>
      </ul>
    </nav>
  </header>
);

export default Header;
