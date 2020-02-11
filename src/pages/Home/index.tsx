import React, { useState } from 'react';
import styles from './Home.module.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LinkTo, Routes } from '../../services/routes';
// @ts-ignore
import looneyTunesIntro from '../../assets/audio/looney_tunes_intro.mp3';
import classNames from 'classnames';
import ColorCircles, { CIRCLE_COLORS } from './ColorCircles';
const TITLE = 'Familien-Quiz';
const Home: React.FC = () => {
  const [clickCounter, setClickCounter] = useState(0);

  const startAnimationTime = (CIRCLE_COLORS.length + 1) * 0.5;
  const titleAnimationEndTime = startAnimationTime + TITLE.length * 0.5;
  return (
    <div className={styles.Home}>
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
        <Link
          to={clickCounter < 10 ? Routes.Home : `${Routes.Master + Routes.Games}`}
          className={styles.StartMasterButton}
          onClick={(): void => setClickCounter(clickCounter + 1)}
        >
          <Button>Ich bin Master!</Button>
        </Link>
      </div>
      <audio src={looneyTunesIntro} autoPlay />
    </div>
  );
};

export default Home;
