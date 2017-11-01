import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import logo from './../assets/wpmlogo.png';
import { getMenuItems } from './utils';


const Header = (props) => {
  const menuItems = getMenuItems(props.build.length, props.selectBuild);
  return (
    <header>
      <nav>
        <div className="pull-left panel-title header-title">
          <img alt="wpm" className="logo" src={logo} />
          webpack monitor
        </div>
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
  );
};

export default Header;
