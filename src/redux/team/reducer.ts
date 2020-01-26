import { AnyAction, Reducer } from 'redux';
import { TEAMS } from '../actionTypes';
import Team from '../../interfaces/Team';
import CacheManager from '../../services/CacheManager';

const cacheManager = new CacheManager<TeamState>('teams');
const cachedData = cacheManager.load();

export interface TeamState {
  data: Team[];
}

const initialState: TeamState = Object.freeze(
  cachedData !== null
    ? cachedData
    : {
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
      },
);

const teamReducer: Reducer<TeamState> = (state: TeamState = initialState, action: AnyAction): TeamState => {
  let newState;
  switch (action.type) {
    case TEAMS.UPDATE:
      newState = {
        ...state,
        data: state.data.map(team => (team.id === action.payload.id ? action.payload : team)),
      };
      cacheManager.save(newState);
      return newState;
    default:
      return state;
  }
};
export default teamReducer;
