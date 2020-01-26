import { AnyAction, Reducer } from 'redux';
import { TEAMS } from '../actions/actionTypes';
import Team from '../interfaces/Team';

export interface TeamState {
  data: Team[];
}

const initialState: TeamState = Object.freeze({
  data: [
    {
      id: 1,
      name: '',
      color: '',
      points: 0,
    },
    {
      id: 2,
      name: '',
      color: '',
      points: 0,
    },
  ],
});

const teamReducer: Reducer<TeamState> = (state: TeamState = initialState, action: AnyAction): TeamState => {
  switch (action.type) {
    case TEAMS.UPDATE:
      return {
        ...state,
        data: state.data.map(team => (team.id === action.payload.id ? action.payload : team)),
      };
    default:
      return state;
  }
};
export default teamReducer;
