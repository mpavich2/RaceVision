import fs from 'fs';
import { IRacingClient } from './services/iracingClient';
import { TRACKS_PATH } from './constants';

export const saveTrackList = async (secret: string) => {
  const trackList = await new IRacingClient(secret).getTrackList();

  fs.writeFileSync(`${TRACKS_PATH}/track-list.json`, trackList, 'utf8');

  console.info('Saved track list');
};
