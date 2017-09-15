import React from 'react';
import { Link } from 'react-router-dom';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Overview</Link></li>
        <li><Link to="/builds">All Builds</Link></li>
        <li><Link to="/performance">Performance</Link></li>
        <li><Link to="/recommendations">Recommendations</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
