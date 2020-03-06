import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LinkTo } from '../../services/routes';
import classNames from 'classnames';
import ColorCircles, { CIRCLE_COLORS } from './ColorCircles';
import { getIntroAudio } from '../../services/utils/firebaseStorage';
import config, { Environment } from '../../services/config';

export interface Props {
  resetGames: () => void;
  resetTeams: () => void;
}
const TITLE = 'Familien-Spiele';
const Home: React.FC<Props> = ({ resetGames, resetTeams }) => {
  const [introAudio, setIntroAudio] = useState(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    getIntroAudio().then(audio => setIntroAudio(audio));
  }, []);

  const handleStart = (): void => {
    if (config.env === Environment.Production) {
      resetGames();
      resetTeams();
    }
    setStarted(true);
  };

  const startAnimationTime = (CIRCLE_COLORS.length + 1) * 0.5;
  const titleAnimationEndTime = startAnimationTime + TITLE.length * 0.5;
  return (
    <div className={styles.Home}>
      {started ? (
        <>
          <div
            className={classNames(styles.Title, 'animated', 'rubberBand', 'slow')}
            style={{ animationDelay: `${titleAnimationEndTime + 1}s` }}
          >
            {TITLE.split('').map((char, index) => (
              <h1
                key={index}
                className={classNames('animated', 'bounceInDown')}
                style={{ animationDelay: `${startAnimationTime + index * 0.5}s` }}
              >
                {char}
              </h1>
            ))}
          </div>
          <ColorCircles />
          <span
            className={classNames(styles.QuestionMark, 'animated', 'rotateIn', 'slower')}
            style={{ animationDelay: `${titleAnimationEndTime + 2}s` }}
          >
            ?
          </span>
          <div
            className={classNames(styles.Control, 'animated', 'fadeIn', 'slower')}
            style={{ animationDelay: `${titleAnimationEndTime + 3}s` }}
          >
            <Link to={LinkTo.teamPreparation(1)}>
              <Button className={styles.StartButton} variant={'contained'} color={'primary'} autoFocus>
                Starten
              </Button>
            </Link>
            <Link to={LinkTo.masterGamesOverview()} className={styles.StartMasterButton}>
              <Button>Ich bin Master!</Button>
            </Link>
          </div>
          {introAudio && <audio src={introAudio} autoPlay />}
        </>
      ) : (
        <div>
          <Button variant="contained" color="primary" onClick={handleStart}>
            Wir wollen Spaß!
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
