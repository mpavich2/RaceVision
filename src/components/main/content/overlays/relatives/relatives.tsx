import { StoreLocations } from '../../../../../constants/storeLocations';
import { MainHeader } from '../../header';

export function RelativesOverlayContent() {
  return (
    <div style={{ width: '100%' }}>
      <MainHeader
        text="Relatives"
        windowName={StoreLocations.RELATIVE_WINDOW}
      />
      <div>
        Quickly spot nearby drivers on track, compare your performance, and
        access important info about your surroundings in real-time.
      </div>
      <p>More info will come here shortly.</p>
    </div>
  );
}
