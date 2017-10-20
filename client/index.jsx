import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppDev from './AppDev';
import App from './App';

const env = process.env.NODE_ENV;

if (env === 'development') {
  // AppDev imports a local JSON file as demo data
  render(
    (
      <BrowserRouter>
        <AppDev />
      </BrowserRouter>
    ),
    document.getElementById('root'),
  );
} else {
  // App retrieves data with fetch from getstats route on plugin server
  render(
    (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ),
    document.getElementById('root'),
  );
}
