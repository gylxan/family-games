import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../services/routes';

export interface Props {
  disableGameByUrl: (url: string) => void;
}
const GamePlayedDetector: React.FC<Props> = ({ disableGameByUrl }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lastIndex = pathname.lastIndexOf('/');
    const gameUrl = pathname.substr(lastIndex);
    if (gameUrl !== Routes.Games) {
      disableGameByUrl(gameUrl);
    }
  }, [pathname, disableGameByUrl]);

  return null;
};
export default GamePlayedDetector;
