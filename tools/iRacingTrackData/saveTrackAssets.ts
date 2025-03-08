import { writeFileSync } from 'fs';
import { IRacingClient } from './services/iracingClient';
import { TRACKS_PATH } from './constants';

export const saveTrackAssets = async (secret: string) => {
  const trackAssets = await new IRacingClient(secret).getTrackAssets();

  writeFileSync(`${TRACKS_PATH}/track-assets.json`, trackAssets, 'utf8');

  console.info('Saved track assets');
};
