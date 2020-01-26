import { GameState } from './games/reducer';
import { RouterState } from 'connected-react-router';
import { TeamState } from './team/reducer';

export default interface RootState {
  game: GameState;
  router: RouterState;
  team: TeamState;
}
