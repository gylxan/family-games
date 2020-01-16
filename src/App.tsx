import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.module.css';
import { Routes } from './services/routes';
import Home from './pages/Home';
import styles from './App.module.css';

const App: React.FC = () => (
  <div className={styles.App}>
    <header className={'Header'}></header>
    <Switch>
      <Route path={Routes.Home}>
        <Home />
      </Route>
    </Switch>
  </div>
);
export default App;
