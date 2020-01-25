import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.module.css';
import { Routes } from './services/routes';
import Home from './pages/Home';
import styles from './App.module.css';
import MasterOverview from './pages/games/master/Overview';
import PlayerOverview from './pages/games/player/index';

const App: React.FC = () => (
  <div className={styles.App}>
    <header className={'Header'} />
    <Switch>
      <Route path={Routes.Home} exact>
        <Home />
      </Route>
      <Route
        path={Routes.Player}
        render={({ match }): React.ReactNode => (
          <>
            <Route path={`${match.path}${Routes.Games}`} component={PlayerOverview} />
          </>
        )}
      />
      <Route
        path={Routes.Master}
        render={({ match }): React.ReactNode => (
          <>
            <Route path={`${match.path}${Routes.Games}`} component={MasterOverview} />
          </>
        )}
      />
    </Switch>
  </div>
);
export default App;
