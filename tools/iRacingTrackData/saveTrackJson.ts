import fs from 'fs';
import { ITrackInfo } from './types';
import { creatTrackJsonList } from './services/convertTrackAssets';
import { NORMALIZED_PATH, TRACKS_PATH } from './constants';

export const saveTracksAsJson = () => {
  const tracks = fs.readdirSync(TRACKS_PATH);
  const trackInfoString = fs.readFileSync(
    `${TRACKS_PATH}/track-list.json`,
    'utf8',
  );
  const trackInfo: ITrackInfo[] = JSON.parse(trackInfoString);

  const trackJsonList = creatTrackJsonList(tracks, trackInfo);

  fs.writeFileSync(
    `${NORMALIZED_PATH}/tracks.json`,
    JSON.stringify(trackJsonList, undefined, 2),
    'utf8',
  );

  console.info('Saved normalized JSON file');
};
