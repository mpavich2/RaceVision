/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { IRacingClient } from './services/iracingClient';
import { TRACKS_PATH } from './constants';

interface TrackAsset {
  track_id: string;
  track_map: string;
  track_map_layers: { [key: string]: string };
}

async function saveTrack(iracingClient: IRacingClient, track: TrackAsset) {
  const trackPath = `${TRACKS_PATH}/${track.track_id}`;

  if (!existsSync(trackPath)) {
    mkdirSync(trackPath, { recursive: true });
  }

  for (const [, layer] of Object.entries(track.track_map_layers)) {
    try {
      const data = await iracingClient.getTrackSvg(track.track_map, layer);
      writeFileSync(`${trackPath}/${layer}`, data, 'utf8');
    } catch (error) {
      console.error(
        `Failed to save SVG for track ${track.track_id} on layer ${layer}`,
      );
      // console.error(error);
    }
  }
}

export const saveAllTrackSvgs = async (authToken: string) => {
  const tracks = readFileSync(`${TRACKS_PATH}/track-assets.json`, 'utf8');

  const allTracks: Record<string, TrackAsset> = JSON.parse(tracks);
  const iracingClient = new IRacingClient(authToken);

  Object.values(allTracks).forEach(async (track) => {
    await saveTrack(iracingClient, track);
  });

  console.info('Saved all track SVGs');
};
