import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import styles from './Home.module.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LinkTo, Routes } from '../../services/routes';
// @ts-ignore
import looneyTunesIntro from '../../assets/audio/looney_tunes_intro.mp3';
import classNames from 'classnames';

const Home: React.FC = () => {
  const [clickCounter, setClickCounter] = useState(0);
  return (
    <div className={styles.Home}>
      <div className={classNames(styles.Title, 'animated', 'rubberBand', 'slow', 'delay-13s')}>
        <h1 className={classNames('animated', 'bounceInDown', 'slow')}>F</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-1s')}>a</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-2s')}>m</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-3s')}>i</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-4s')}>l</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-5s')}>i</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-6s')}>e</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-7s')}>n</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-8s')}>-</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-9s')}>Q</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-10s')}>u</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-11s')}>i</h1>
        <h1 className={classNames('animated', 'bounceInDown', 'slow', 'delay-12s')}>z</h1>
      </div>
      <img
        src={logo}
        className={classNames(styles.Logo, 'animated', 'jackInTheBox', 'slower', 'delay-14s')}
        alt="logo"
      />
      <div className={classNames(styles.Control, 'animated', 'fadeIn', 'slower', 'delay-15s')}>
        <Link to={LinkTo.teamPreparation(1)}>
          <Button className={styles.StartButton} variant={'contained'} color={'primary'}>
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
        <audio src={looneyTunesIntro} autoPlay />
      </div>
    </div>
  );
};

export default Home;
