import { GameState } from './Game';
import { RouterState } from 'connected-react-router';

export default interface RootState {
  game: GameState;
  router: RouterState;
}
