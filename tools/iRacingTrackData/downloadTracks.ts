import { authenticate } from './authenticate';
import { createAssetsFolder } from './createAssetsFolder';
import { saveTrackAssets } from './saveTrackAssets';
import { saveTrackList } from './saveTrackList';
import { saveAllTrackSvgs } from './saveTrackSvgs';

const main = async () => {
  createAssetsFolder();
  const authToken = await authenticate();
  await saveTrackAssets(authToken);
  await saveTrackList(authToken);
  await saveAllTrackSvgs(authToken);
};

main();
