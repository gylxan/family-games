import * as firebase from 'firebase/app';
import 'firebase/storage';

export const initFirebase = (): void => {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  });
};

export const getStorageElementURLs = (path): Promise<string[]> => {
  const storage: firebase.storage.Storage = firebase.storage();
  const storageRef: firebase.storage.Reference = storage.ref();
  const childRefs: firebase.storage.Reference = storageRef.child(path);
  return childRefs.listAll().then(list => {
    const downloadURLs: Promise<string>[] = list.items.map(element => element.getDownloadURL());
    return Promise.all(downloadURLs);
  });
};

export const getBlurImages = (): Promise<string[]> => getStorageElementURLs('images/blur');

export const getTetrisImage = (): Promise<string> =>
  getStorageElementURLs('images/tetris').then(images => (!!images && images.length >= 1 ? images[0] : ''));

export const getIntroAudio = (): Promise<string> =>
  getStorageElementURLs('audio/intro').then(audios => (!!audios && audios.length >= 1 ? audios[0] : ''));

export const getGameOverviewAudios = (): Promise<string[]> => getStorageElementURLs('audio/game-overview');
