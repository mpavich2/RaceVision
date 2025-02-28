import { StoreLocations } from '../../../../../constants/storeLocations';
import { MainHeader } from '../../header';

export function FuelCalculatorOverlayContent() {
  return (
    <div>
      <MainHeader
        text="Fuel Calculator"
        windowName={StoreLocations.FUEL_CALCULATOR}
      />
      <div>
        Accurately plan your fuel strategy with real-time calculations, ensuring
        you have just the right amount to finish the race strong.
      </div>
      <p>More info will come here shortly.</p>
    </div>
  );
}
