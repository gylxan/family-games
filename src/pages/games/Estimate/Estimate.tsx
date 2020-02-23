/* eslint-disable react/jsx-no-undef */
import React from 'react';
import GameDescription, { Props as GameDescriptionProps } from '../../../components/GameDescription';
import { getRandomIndex } from '../../../services/utils/array';
import Team from '../../../interfaces/Team';

import styles from './Estimate.module.css';
import GameFlow from '../../../components/GameFlow';
import { Button, TextField } from '@material-ui/core';
import { Loupe, RemoveRedEye } from '@material-ui/icons';

export interface Props {
  teams: Team[];
}

export interface State {
  currentQuestion: Question;
  availableQuestions: Question[];
  showAnswer: boolean;
  values: { [id: number]: string };
  winningIds: number[];
  tipsToShow: number;
}

interface Question {
  question: string;
  answer: number;
  answerText?: string;
  tips?: string[];
}

const QUESTIONS: Question[] = [
  {
    question: 'Wie viele Liter Wasser kann ein ausgewachsenes Kamel in 15 Minuten trinken?',
    answer: 1.386,
    tips: [
      'Das aufgenommene Wasser steht dem Kamel rund 4 Wochen zur Verfügung',
      'Mit dem aufgenommenen Wasser kann man durchschnittlich ca. 17 Minuten duschen',
    ],
  },
  {
    question: 'Wie viele Bienenarten gibt es in Europa?',
    answer: 700,
    answerText: 'Alleine 500 Bienenarten sind in Deutschland heimisch!',
    tips: ['Im ca. gleichen Jahr wurde Dubrovnik gegründet'],
  },
  {
    question: 'Wie viel Stunden Videomaterial werden pro Minute auf Youtube hochgeladen?',
    answer: 400,
    answerText: 'Würde man sie nacheinander anschauen, wäre man 16 Tage und Nächte beschäftigt.',
  },

  {
    question: 'Mit wie viel km/h fliegt die ISS um die Erde?',
    answer: 28000,
    tips: ['Für eine Umrundung benötigt die ISS rund 90 Minuten.', ' In Euro könnte man davon zwei Kleinwagen kaufen'],
  },
  {
    question: 'Wie viele Buchstaben hat das hawaiianische Alphabet?',
    answer: 12,
    answerText:
      'Das hawaiianische Alphabet ist das Kürzeste der Welt und besteht nur aus den Buchstaben a, e, i, o, u, p, k, m, n, w, l, h.',
    tips: ['Ein Fußball-Team hat weniger Spieler', 'Ein normales Geodreieck hat mehr Centimeter'],
  },
  {
    question: 'Wie viele Einkerbungen hat ein Golfball?',
    answer: 336,
    tips: ['Wir haben mehr Tage pro Jahr'],
  },
  {
    question: 'Wie viel darf ein Boxer der Fliegengewichtsklasse maximal wiegen?',
    answer: 51,
    tips: ['Es sind weniger Kilo als der Älteste von uns alt ist'],
  },
  {
    question: 'Ein ausgewachsener Mensch besitzt 206 Knochen, aber mit wie vielen werden wir geboren?',
    answer: 350,
    tips: [
      'Babys haben viele weiche Knochen',
      'Das Zusammenwachsen der Knochen ist im Alter von 20 bis 25 Jahren abgeschlossen',
    ],
  },
];

const MAX_ROUNDS = 5;

class Estimate extends React.PureComponent<Props, State> {
  state = {
    showAnswer: false,
    currentQuestion: null,
    availableQuestions: QUESTIONS,
    values: {},
    winningIds: [],
    tipsToShow: 0,
  };

  startNextTurn = (): void => {
    this.setRandomQuestion();
    this.setState({
      showAnswer: false,
      values: {},
      winningIds: [],
      tipsToShow: 0,
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

  handleShowTip = (): void => {
    this.setState({
      tipsToShow: this.state.tipsToShow + 1,
    });
  };

  renderGame = (): JSX.Element => {
    const { teams } = this.props;
    if (!this.state.currentQuestion) {
      return null;
    }
    return (
      <div className={styles.Game}>
        <span className={styles.Question}>Frage: {this.state.currentQuestion.question}</span>
        {Array.from({ length: this.state.tipsToShow }).map((value, key) => (
          <div key={'tip-' + key} className={styles.Tip}>
            {this.state.currentQuestion.tips[key]}
          </div>
        ))}
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
          <div className={styles.Answer}>
            <span>Lösung: {this.state.currentQuestion.answer}</span>
            {this.state.currentQuestion.answerText && <span>{this.state.currentQuestion.answerText}</span>}
          </div>
        ) : (
          <div className={styles.ButtonContainer}>
            {!!this.state.currentQuestion.tips && this.state.tipsToShow < this.state.currentQuestion.tips.length && (
              <Button color={'primary'} onClick={this.handleShowTip}>
                <Loupe style={{ color: 'white' }} />
              </Button>
            )}
            <Button color={'primary'} onClick={this.handleCheckValues}>
              <RemoveRedEye style={{ color: 'white' }} />
            </Button>
          </div>
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
          <strong>Beschreibung:</strong> Es werden Schätzfragen gestellt, die es gilt zu beantworten! Beratschlagt euch
          mit eurem Team und schreibt die Antwort auf Zetteln, die ihr den Quizmastern gebt.
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
        />
      </>
    );
  }
}

export default Estimate;
