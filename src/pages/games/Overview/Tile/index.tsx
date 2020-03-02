import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import styles from './Tile.module.css';
import { Game } from '../../../../interfaces/Game';

export interface Props {
  game: Game;
  isActive?: boolean;
  isChosen?: boolean;
  size?: 'Normal' | 'Large';
  className?: string;
  style?: CSSProperties;
}

const Tile: React.FC<Props> = ({ game, isActive = false, isChosen = false, size = 'Normal', className, style }) => {
  const cssProperties: CSSProperties = {
    backgroundColor: !game.alreadyPlayed ? game.color : '',
    ...style,
  };
  return (
    <div
      className={classNames(
        styles.Tile,
        { [styles.Active]: isActive },
        { [styles.Chosen]: isChosen },
        { [styles.AlreadyPlayed]: game.alreadyPlayed },
        styles[`Size${size}`],
        className,
      )}
      style={cssProperties}
    >
      {game.name}
    </div>
  );
};

export default Tile;
