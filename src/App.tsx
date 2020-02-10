import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.module.css';
import { Routes } from './services/routes';
import Home from './pages/Home';
import styles from './App.module.css';
import MasterOverview from './pages/games/master/Overview';
import Pantomime from './pages/games/PantomimeGame/master';
import PlayerOverview from './pages/games/player';
import TeamPreparation from './pages/TeamPreparation';
import TeamPointsCounter from './components/TeamPointsCounter';
import { STATIC_GAMES } from './services/constants/game';
import GamePlayedDetector from './components/GamePlayedDetector';
import AwardCeremony from './pages/AwardCeremony';
import { initFirebase } from './services/utils/firebaseStorage';

const App: React.FC = () => {
  useEffect(() => {
    initFirebase();
  }, []);

  return (
    <div className={styles.App}>
      <Switch>
        <Route path={Routes.Home} exact>
          <Home />
        </Route>
        <Route path={Routes.TeamPreparation} component={TeamPreparation} />
        <Route path={Routes.AwardCeremony} component={AwardCeremony} />
        <Route
          path={Routes.Player}
          render={({ match }): React.ReactNode => (
            <>
              <TeamPointsCounter />
              <GamePlayedDetector />
              <div className={styles.PlayerContent}>
                <Switch>
                  <Route path={`${match.path}${Routes.Games}`} component={PlayerOverview} exact />
                  {STATIC_GAMES.map(game => (
                    <Route
                      key={`player-${game.name}`}
                      path={`${match.path}${Routes.Games}${game.url}`}
                      component={game.component}
                    />
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
              <Route path={`${match.path}${Routes.Games}/koerper-klaus`} component={Pantomime} />
              <Route path={`${match.path}${Routes.Games}`} component={MasterOverview} />
            </Switch>
          )}
        />
      </Switch>
    </div>
  );
};
export default App;
