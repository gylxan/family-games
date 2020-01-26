import { GameState } from '../reducer/gameReducer';
import { RouterState } from 'connected-react-router';
import { TeamState } from '../reducer/teamReducer';

export default interface RootState {
  game: GameState;
  router: RouterState;
  team: TeamState;
}
