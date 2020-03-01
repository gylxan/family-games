import React from 'react';
import styles from './Scoring.module.css';
import { Check, Clear } from '@material-ui/icons';

import { Button } from '@material-ui/core';
import Team from '../../interfaces/Team';
import { getOtherTeam } from '../../services/utils/team';
import classNames from 'classnames';

export interface Props {
  onScored: (teamId: null | number) => void;
  teams: Team[];
  activeTeamId?: number;
  showSkipOption: boolean;
}

const Scoring: React.FC<Props> = ({ onScored, teams, activeTeamId, showSkipOption }) => (
  <div className={classNames(styles.FooterRating)}>
    {!!activeTeamId ? (
      <>
        <Button
          className="MuiButton-containedRight"
          variant={'contained'}
          onClick={(): void => onScored(activeTeamId)}
          startIcon={<Check />}
        >
          Richtig
        </Button>
        <Button
          className="MuiButton-containedWrong"
          variant={'contained'}
          onClick={(): void => onScored(getOtherTeam(teams, activeTeamId).id)}
          startIcon={<Clear />}
        >
          Falsch
        </Button>
      </>
    ) : (
      <>
        {teams.map((team, index) => (
          <>
            <Button
              key={team.id}
              variant={'contained'}
              color="primary"
              className={styles.TeamButton}
              onClick={(): void => onScored(team.id)}
            >
              {team.name}
            </Button>
            {showSkipOption && index + 1 === teams.length / 2 && (
              <Button onClick={(): void => onScored(null)}>
                <Clear style={{ color: 'white' }} />
              </Button>
            )}
          </>
        ))}
      </>
    )}
  </div>
);
export default Scoring;
