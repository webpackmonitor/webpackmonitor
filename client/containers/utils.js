import React from 'react';
import { MenuItem } from 'react-bootstrap';


export function getMenuItems(buildNumber, selectBuild) {
  const menuItems = [];
  for (let i = buildNumber; i > 0; i -= 1) {
    menuItems.push(<MenuItem onClick={selectBuild} data-build={i} key={`build${i}`}>Build {i}</MenuItem>);
  }
  return menuItems;
}
