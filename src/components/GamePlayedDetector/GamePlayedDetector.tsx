import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../services/routes';

export interface Props {
  disableGameByUrl: (url: string) => void;
  setCurrentGameByUrl: (url: string) => void;
}
const GamePlayedDetector: React.FC<Props> = ({ disableGameByUrl, setCurrentGameByUrl }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lastIndex = pathname.lastIndexOf('/');
    const gameUrl = pathname.substr(lastIndex);
    if (gameUrl !== Routes.Games) {
      disableGameByUrl(gameUrl);
    }
    setCurrentGameByUrl(gameUrl);
  }, [pathname, disableGameByUrl, setCurrentGameByUrl]);

  return null;
};
export default GamePlayedDetector;
