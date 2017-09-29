import React from 'react';
import Header from './Header';
import Main from './Main';
import MainProd from './MainProd';

const App = () => {
  // console.log(process.env.NODE_ENV);
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
  if (env === 'data') {
    return (
      <div>
        <Header />
        <MainProd />
      </div>
    );
  }
};

export default App;
