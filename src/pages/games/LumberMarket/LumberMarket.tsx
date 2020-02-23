import React from 'react';
import { TextField } from '@material-ui/core';
import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import GameFlow from '../../../components/GameFlow';

import { GameMode } from '../../../components/GameFlow/GameFlow';
import Team from '../../../interfaces/Team';
import { shuffle } from '../../../services/utils/array';
import styles from './LumberMarket.module.css';

const MAX_ROUNDS = 1;
const POINTS_PER_ROUND = 5;

export interface Props {
  teams: Team[];
}

interface Weight {
  team: Team;
  value: number;
  additionalValue: string;
}

type TextFieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface State {
  percentageBaseValue: number;
  weights: Weight[];
}

class LumberMarket extends React.PureComponent<Props, State> {
  getInitialWeights = (): Weight[] => {
    return shuffle<Weight>(this.props.teams.map((team: Team) => ({ team: team, value: 0, additionalValue: '' })));
  };

  state = {
    percentageBaseValue: 4000,
    weights: this.getInitialWeights(),
  };

  handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const updatedWeights: Weight[] = [...this.state.weights];
    updatedWeights[index].additionalValue = e.target.value;
    this.setState({ weights: updatedWeights });
  }

  handleKeyDown = (e: React.KeyboardEvent<TextFieldElement>, index: number): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const updatedWeights: Weight[] = [...this.state.weights];
      const targetValue: number = updatedWeights[index].value + parseInt(updatedWeights[index].additionalValue);
      updatedWeights[index].additionalValue = '';
      this.countUp(targetValue, index);
      this.setState({
        percentageBaseValue: Math.max(this.state.percentageBaseValue, targetValue),
      });
    }
  };

  countUp = (targetValue: number, index: number): void => {
    const steps = (targetValue - this.state.weights[index].value) / 10;
    const interval = window.setInterval(() => {
      let newValue: number = this.state.weights[index].value + Math.ceil(Math.random() * steps);
      if (newValue > targetValue) {
        window.clearInterval(interval);
        newValue = targetValue;
      }
      this.setState(prevState => {
        const updatedWeights = [...prevState.weights];
        updatedWeights[index].value = newValue;
        return {
          weights: updatedWeights,
        };
      });
    }, 100);
  };

  getPercentValue(weightInGram: number): string {
    return `${(weightInGram / this.state.percentageBaseValue) * 100}%`;
  }

  getFormattedWeight(weightInGram: number): string {
    const kilogram = Math.floor(weightInGram / 1000);
    const gram = weightInGram % 1000;
    return kilogram > 0 ? `${kilogram},${gram} kg` : `${weightInGram} g`;
  }

  renderGameDescription = (): React.ReactElement<GameDescriptionProps> => {
    return (
      <GameDescription>
        <p>
          <strong>Teilnehmer:</strong> alle
        </p>
        <p>
          <strong>Modus:</strong> Battle
        </p>
        <p>
          <strong>Rundenzahl:</strong> {MAX_ROUNDS}
        </p>
        <p>
          <strong>Beschreibung:</strong> Die Teams sammeln ihre mitgebrachten Holzstücke und bringen sie zur Waage. Das
          Team mit dem höheren Gesamtgewicht gewinnt das Spiel und erhält 5 Punkte. Anschließend können die Holzstücke
          in den Kamin geworfen oder fachgerecht entsorgt werden.
        </p>
      </GameDescription>
    );
  };

  renderGamePlay(): JSX.Element {
    return (
      <div className={styles.Row}>
        {this.state.weights.map((weight: Weight, index: number) => (
          <div className={styles.TeamColumn} key={weight.team.id}>
            <div>
              <span className={styles.TeamBarGraph} style={{ height: this.getPercentValue(weight.value) }}></span>
              <small className={styles.TeamName}>{weight.team.name}</small>
              <strong className={styles.TeamValue}>{this.getFormattedWeight(weight.value)}</strong>
              <TextField
                className={styles.TeamInput}
                value={weight.additionalValue}
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleChange(e, index)}
                InputProps={{
                  onKeyDown: (e: React.KeyboardEvent<TextFieldElement>): void => this.handleKeyDown(e, index),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <>
        <h1>Holzmarkt</h1>
        <GameFlow
          rounds={MAX_ROUNDS}
          pointsPerRound={POINTS_PER_ROUND}
          showScoring
          descriptionComponent={this.renderGameDescription()}
          playingComponent={this.renderGamePlay()}
          gameMode={GameMode.BATTLE}
        />
      </>
    );
  }
}

export default LumberMarket;
