import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import logo from './assets/wpmlogo.png';


// The Header creates links that can be used to navigate
// between routes.

const getMenuItems = (buildNumber, selectBuild) => {
  const menuItems = [];
  for (let i = buildNumber; i > 0; i -= 1) {
    menuItems.push(<MenuItem onClick={selectBuild} data-build={i} key={`build${i}`}>Build {i}</MenuItem>);
  }
  return menuItems;
};

const Header = (props) => {
  const menuItems = getMenuItems(props.build.length, props.selectBuild);
  return (
    <header>
      <nav>
        <div className="pull-left panel-title header-title"><img className="logo" src={logo} />webpack monitor</div>
        <ul className="links list-inline pull-right">
          <NavDropdown title="Select Build" id="basic-nav-dropdown">
            {menuItems}
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
