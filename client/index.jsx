import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppDev from './AppDev';
import App from './App';

const env = process.env.NODE_ENV;

if (env === 'development') {
  render(
    (
      <BrowserRouter>
        <AppDev />
      </BrowserRouter>
    ),
    document.getElementById('root'),
  );
} else {
  render(
    (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ),
    document.getElementById('root'),
  );
}
