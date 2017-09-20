import React from 'react';
import { Link } from 'react-router-dom';

const Builds = () => (
  <div>
    <h1>These are the builds</h1>
    <Link to="builds/123">Go to builds 123</Link>
    <Link to="builds/dashboard/123">Go to builds dasboard 123</Link>

  </div>
);

export default Builds;
