import React from 'react';
import GameDescription, { Props as GameDescriptionProps } from '../../../../components/GameDescription';
import { getRandomIndex } from '../../../../services/utils/array';
import Team from '../../../../interfaces/Team';

import styles from './Estimate.module.css';
import GameFlow from '../../../../components/GameFlow';
import { Button, TextField } from '@material-ui/core';

export interface Props {
  teams: Team[];
}

export interface State {
  currentQuestion: Question;
  availableQuestions: Question[];
  showAnswer: boolean;
  values: { [id: number]: string };
  winningIds: number[];
}

interface Question {
  question: string;
  answer: number;
}

const QUESTIONS: Question[] = [
  {
    question: 'Wie viele Milliarden Menschen leben in China?',
    answer: 1.386,
  },
];

const MAX_ROUNDS = 5;

const COUNTDOWN_IN_SECONDS = 60;

class Estimate extends React.PureComponent<Props, State> {
  state = {
    showAnswer: false,
    currentQuestion: null,
    availableQuestions: QUESTIONS,
    values: {},
    winningIds: [],
  };

  startNextTurn = (): void => {
    this.setRandomQuestion();
    this.setState({
      showAnswer: false,
      values: {},
      winningIds: [],
    });
  };

  setRandomQuestion = (): void => {
    const newQuestionIndex = getRandomIndex(this.state.availableQuestions);
    const newAvailableQuestions = [...this.state.availableQuestions];
    newAvailableQuestions.splice(newQuestionIndex, 1);
    this.setState({
      currentQuestion: this.state.availableQuestions[newQuestionIndex],
      availableQuestions: newAvailableQuestions,
    });
  };

  handleValueChange = (teamId: number, value: string): void => {
    this.setState({
      values: {
        ...this.state.values,
        [teamId]: value,
      },
    });
  };

  handleCheckValues = (): void => {
    let winningIds = [];
    let value, difference, nearestDifference, teamIdAsNumber;
    Object.keys(this.state.values).forEach(teamId => {
      teamIdAsNumber = Number(teamId);
      value = parseFloat(this.state.values[teamId].replace(',', '.')) * 1000;
      difference = Math.abs(value - this.state.currentQuestion.answer * 1000);
      if (!nearestDifference || difference < nearestDifference) {
        winningIds = [teamIdAsNumber];
        nearestDifference = difference;
      } else if (difference === nearestDifference) {
        winningIds = [...winningIds, teamIdAsNumber];
      }
    });
    this.setState({
      showAnswer: true,
      winningIds,
    });
  };

  handleCountdown = (secondsRemaining: number): void => {};

  renderGame = (): JSX.Element => {
    const { teams } = this.props;
    return (
      <div className={styles.Game}>
        <span>Frage: {this.state.currentQuestion && this.state.currentQuestion.question}</span>
        <div className={styles.InputContainer}>
          {teams.map((team, index) => (
            <TextField
              autoFocus={index === 0}
              error={this.state.winningIds.length >= 1 && !this.state.winningIds.includes(team.id)}
              key={team.id}
              placeholder={team.name}
              onChange={(event): void => this.handleValueChange(team.id, event.currentTarget.value)}
            />
          ))}
        </div>
        {this.state.showAnswer ? (
          <span>Lösung: {this.state.currentQuestion.answer}</span>
        ) : (
          <Button color={'primary'} variant={'contained'} onClick={this.handleCheckValues}>
            Prüfen
          </Button>
        )}
      </div>
    );
  };

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
          <strong>Beschreibung:</strong> Es werden Schätzfragen gestellt, die es gilt zu beantworten! Schreibt die
          Antworten auf einen Zettel und gebt sie den Quizmastern.
        </p>
      </GameDescription>
    );
  };

  render(): JSX.Element {
    return (
      <>
        <h1>Schätze</h1>
        <GameFlow
          rounds={MAX_ROUNDS}
          showScoring
          descriptionComponent={this.renderGameDescription()}
          playingComponent={this.renderGame()}
          onStartPlaying={this.startNextTurn}
          onCountdown={this.handleCountdown}
        />
      </>
    );
  }
}

export default Estimate;
