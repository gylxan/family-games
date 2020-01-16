import React from 'react';
import logo from '../../assets/images/logo.png';
import styles from './Home.module.css';

const Home: React.FC = () => (
  <div className={styles.Home}>
    <img src={logo} className={styles.Logo} alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a className={styles.Link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React
    </a>
  </div>
);

export default Home;
