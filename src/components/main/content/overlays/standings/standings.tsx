import { StoreLocations } from '../../../../../constants/storeLocations';
import { MainHeader } from '../../header';

export function StandingsOverlayContent() {
  return (
    <div>
      <MainHeader
        text="Standings"
        windowName={StoreLocations.STANDINGS_WINDOW}
      />
      <div>
        Effortlessly view real-time race positions and standings. Stay informed
        about your on-track position relative to other drivers, with full
        multiclass support.
      </div>
      <p>More info will come here shortly.</p>
    </div>
  );
}
