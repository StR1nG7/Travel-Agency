import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../utils/styled-components';
import Header from '../components/Header';

const HomePage = React.lazy(() => import('./HomePage'));
const ToursPage = React.lazy(() => import('./ToursPage'));
const SingleTourPage = React.lazy(() => import('./SingleTourPage'));

const App:React.FC = () => (
  <>
    <GlobalStyle />
    <Header />

    <main>
      <div className="container">
        <div className="row">

          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/tours" component={ToursPage} />
              <Route path="/tours/:id" component={SingleTourPage} />
            </Switch>
          </Suspense>

        </div>
      </div>
    </main>
  </>
);

export default App;
