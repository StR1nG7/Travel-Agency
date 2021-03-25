import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import store from '../store';
import { theme } from './styled-components';

const renderWithRouterAndContext = (ui: React.ReactElement, { ...renderOptions } = {}) => render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        { ui }
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  renderOptions,
);

export default renderWithRouterAndContext;
