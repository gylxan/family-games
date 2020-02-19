import React from 'react';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { STATIC_GAMES } from '../../../services/constants/game';
import { Routes } from '../../../services/routes';
import styles from './Overview.module.css';

export interface Props {
  push: (url: string) => void;
}

const Overview: React.FC<Props> = ({ push }) => {
  return (
    <div className={styles.Overview}>
      <List component="nav" aria-label="folders" className={styles.List}>
        {STATIC_GAMES.filter(game => !!game.masterComponent).map(game => (
          <ListItem key={game.name} button alignItems={'center'}>
            <ListItemText
              inset
              primary={game.name}
              onClick={(): void => push(`${Routes.Master}${Routes.Games}${game.url}`)}
              className={styles.ListItemText}
            />
          </ListItem>
        ))}
      </List>
      <div className={styles.ButtonContainer}>
        <Button color="primary" variant="contained" onClick={(): void => push(`${Routes.Home}`)}>
          Startseite
        </Button>
        <Button color="primary" variant="contained" onClick={(): void => push(`${Routes.Player}${Routes.Games}`)}>
          Zur Spieleübersicht
        </Button>
      </div>
    </div>
  );
};

export default Overview;
