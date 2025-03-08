import fs from 'fs';
import { NORMALIZED_PATH, TRACKS_PATH } from './constants';

export const createAssetsFolder = () => {
  fs.mkdirSync(TRACKS_PATH, { recursive: true });
  fs.mkdirSync(NORMALIZED_PATH, { recursive: true });

  console.info('Track asset folders created at ./src/assets');
};
