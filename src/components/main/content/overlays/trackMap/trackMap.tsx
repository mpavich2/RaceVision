import { StoreLocations } from '../../../../../constants/storeLocations';
import { MainHeader } from '../../header';
import { CustomizationSettings } from '../common/customization';
import { BackgroundToggle } from './toggles/background';
import { TurnsToggle } from './toggles/turns';

export function TrackMapOverlayContent() {
  return (
    <div>
      <MainHeader text="Track Map" windowName={StoreLocations.TRACK_MAP} />
      <div>
        Stay oriented with a live track map showing your position, upcoming
        turns, and the locations of other drivers for better situational
        awareness.
      </div>

      <CustomizationSettings>
        <TurnsToggle />
        <BackgroundToggle />
      </CustomizationSettings>
    </div>
  );
}
