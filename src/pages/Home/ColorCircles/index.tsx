import React from 'react';

import styles from './ColorCircles.module.css';
import classNames from 'classnames';

export const CIRCLE_COLORS = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];

export class ColorCircles extends React.Component {
  getCircleSize = (): number => 100 / CIRCLE_COLORS.length;
  render(): JSX.Element {
    return (
      <div className={styles.Container}>
        {CIRCLE_COLORS.map((color, index) => {
          const size = 100 - this.getCircleSize() * index;
          return (
            <div
              key={color}
              className={classNames(styles.Circle, 'animated', 'fadeIn')}
              style={{
                backgroundColor: `${color}`,
                width: `${size}%`,
                height: `${size}%`,
                animationDelay: `${(CIRCLE_COLORS.length - index +1) * 0.5}s`,
              }}
            />
          );
        })}
      </div>
    );
  }
}
export default ColorCircles;
