import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import store from './store';
import './utils/modernizr-checkWebpSupport';
import { theme } from './utils/styled-components';

import App from './containers/App';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root'));
