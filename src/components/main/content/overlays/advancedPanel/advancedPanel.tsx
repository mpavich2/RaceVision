import { StoreLocations } from '../../../../../constants/storeLocations';
import { MainHeader } from '../../header';

export function AdvancedPanelOverlayContent() {
  return (
    <div>
      <MainHeader
        text="Advanced Panel"
        windowName={StoreLocations.INPUTS_WINDOW}
      />
      <div>
        Track key performance details like gear selection, speed, RPM, shift
        lights, and race position in one intuitive display, giving you the
        insights needed to stay ahead on track.
      </div>
      <p>More info will come here shortly.</p>
    </div>
  );
}
