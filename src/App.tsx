import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.module.css';
import { Routes } from './services/routes';
import Home from './pages/Home';
import styles from './App.module.css';
import PlayerOverview from './pages/games/Overview';
import MasterOverview from './pages/master/Overview';
import TeamPreparation from './pages/TeamPreparation';
import TeamPointsCounter from './components/TeamPointsCounter';
import { STATIC_GAMES } from './services/constants/game';
import GamePlayedDetector from './components/GamePlayedDetector';
import AwardCeremony from './pages/AwardCeremony';

const App: React.FC = () => (
  <div className={styles.App}>
    <Switch>
      <Route path={Routes.TeamPreparation} component={TeamPreparation} />
      <Route path={Routes.AwardCeremony} component={AwardCeremony} />
      <Route
        path={Routes.Games}
        render={({ match }): React.ReactNode => (
          <>
            <TeamPointsCounter />
            <GamePlayedDetector />
            <div className={styles.PlayerContent}>
              <Switch>
                <Route path={`${match.path}`} component={PlayerOverview} exact />
                {STATIC_GAMES.map(game => (
                  <Route key={`player-${game.name}`} path={`${match.path}${game.url}`} component={game.component} />
                ))}
              </Switch>
            </div>
          </>
        )}
      />
      <Route
        path={Routes.Master}
        render={({ match }): React.ReactNode => (
          <Switch>
            {STATIC_GAMES.filter(game => !!game.masterComponent).map(game => (
              <Route key={`master-${game.name}`} path={`${match.path}${game.url}`} component={game.masterComponent} />
            ))}
            <Route path={`${match.path}`} component={MasterOverview} />
          </Switch>
        )}
      />
      <Route path={Routes.Home}>
        <Home />
      </Route>
    </Switch>
  </div>
);
export default App;
