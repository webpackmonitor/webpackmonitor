import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, MenuItem } from 'react-bootstrap';

// The Header creates links that can be used to navigate
// between routes.

const getMenuItems = (buildNumber) => {
  const menuItems = [];
  for (let i = 0; i <= buildNumber; i += 1) {
    menuItems.push(<MenuItem>Build {i}</MenuItem>)
  }
  return menuItems;
};

const Header = () => {
  return (
    <header>
      <nav>
        <div className="pull-left panel-title header-title">webpack monitor</div>
        <ul className="links list-inline pull-right">
          <NavDropdown title="Select Build" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
          <li><Link to="/">Overview</Link></li>
          <li><Link to="/builds">Build Data</Link></li>
          <li><Link to="/recommendations">Recommendations</Link></li>
        </ul>
      </nav>
    </header>
  )
};

export default Header;
