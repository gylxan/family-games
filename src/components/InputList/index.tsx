import React from 'react';
import styles from './InputList.module.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import classNames from 'classnames';

export interface Props {
  edit: boolean;
  inputs: string[];
  updateInputs: (inputs: string[]) => void;
}

export interface State {
  newValue: string;
}

class InputList extends React.Component<Props, State> {
  state = {
    newValue: '',
  };

  handleNewChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      newValue: e.currentTarget.value,
    });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.state.newValue) {
        this.setState({
          newValue: '',
        });
        this.props.updateInputs([...this.props.inputs, this.state.newValue]);
      }
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const updatedInputs = [...this.props.inputs];
    updatedInputs[index] = e.currentTarget.value;

    this.props.updateInputs(updatedInputs);
  };

  removeItem = (index: number): void => {
    const updatedInputs = [...this.props.inputs];
    updatedInputs.splice(index, 1);

    this.props.updateInputs(updatedInputs);
  };

  render(): React.ReactNode {
    return (
      <form noValidate autoComplete="off" className={styles.Form}>
        <div className={classNames(styles.InputList, { [styles.MultipleInputs]: this.props.inputs.length > 1 })}>
          {this.props.inputs.map((value: string, index: number) => (
            <div className={styles.Row} key={index}>
              <TextField
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.handleChange(e, index)}
              />
              <span className={styles.ClearInput}>
                <Button onClick={(): void => this.removeItem(index)}>
                  <Clear />
                </Button>
              </span>
            </div>
          ))}
        </div>
        <div>
          <TextField
            className={styles.NewInput}
            name="newItem"
            variant="filled"
            value={this.state.newValue}
            onChange={this.handleNewChange}
            InputProps={{ onKeyDown: this.handleKeyDown }}
          />
        </div>
      </form>
    );
  }
}
export default InputList;
