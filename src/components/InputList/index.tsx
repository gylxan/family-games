import React from 'react';
// import styles from './InputList.module.css';
import { TextField } from '@material-ui/core';

export interface Props {
  edit: boolean;
}

export interface State {
  inputs: string[];
  newValue: string;
}

class InputList extends React.Component<Props, State> {
  state = {
    inputs: ['foo'],
    newValue: ''
  }

  handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newValue: e.currentTarget.value
    });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.state.newValue) {
      this.setState({
        newValue: '',
        inputs: [...this.state.inputs, this.state.newValue]
      });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedInputs = [...this.state.inputs];
    updatedInputs[index] = e.currentTarget.value;

    this.setState({
      inputs: updatedInputs
    });
  };

  render(): React.ReactNode {
    return (
      <form noValidate autoComplete="off">
        {this.state.inputs.map((value: string, index: number) => (
          <TextField key={index} variant="filled" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e, index)} />
        ))}
        <TextField name="newItem" variant="filled" value={this.state.newValue} onChange={this.handleNewChange} InputProps={{onKeyDown: this.handleKeyDown}}/>
      </form>
    );
  }
}
export default InputList;
