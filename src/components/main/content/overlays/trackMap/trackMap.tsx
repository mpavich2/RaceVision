import { StoreLocations } from '../../../../../constants/storeLocations';
import { MainHeader } from '../../header';

export function TrackMapOverlayContent() {
  return (
    <div>
      <MainHeader text="Track Map" windowName={StoreLocations.TRACK_MAP} />
      <div>
        Stay oriented with a live track map showing your position, upcoming
        turns, and the locations of other drivers for better situational
        awareness.
      </div>
      <p>More info will come here shortly.</p>
    </div>
  );
}
