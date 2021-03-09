import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import TitlePanel from '../components/TitlePanel';
import { GlobalStyle, theme } from '../utils/styled-components';

const ToursPage = React.lazy(() => import('./ToursPage'));
const SingleTourPage = React.lazy(() => import('./SingleTourPage'));

const App:React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Header />
    <TitlePanel />

    <main>
      <div className="container">
        <div className="row">

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/tours" component={ToursPage} />
              <Route path="/tours/:id" component={SingleTourPage} />
            </Switch>
          </Suspense>

        </div>
      </div>
    </main>
  </ThemeProvider>
);

export default App;
