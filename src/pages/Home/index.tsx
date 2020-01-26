import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import styles from './Home.module.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Routes } from '../../services/routes';

const Home: React.FC = () => {
  const [clickCounter, setClickCounter] = useState(0);
  return (
    <div className={styles.Home}>
      <h1>Familien-Quiz</h1>
      <img src={logo} className={styles.Logo} alt="logo" />
      <div className={styles.Control}>
        <Link to={`${Routes.TeamPreparation}/1`}>
          <Button className={styles.StartButton} variant={'contained'} color={'primary'}>
            Starten
          </Button>
        </Link>
        <Link
          to={clickCounter < 10 ? Routes.Home : `${Routes.Master + Routes.Games}`}
          className={styles.StartMasterButton}
          onClick={(): void => setClickCounter(clickCounter + 1)}
        >
          <Button>
            Ich bin Master!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
