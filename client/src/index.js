import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from './App';
import store from './redux/store';
import Theme from './theme/theme';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter><App /></BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root'),
);
