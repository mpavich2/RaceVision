import { useAppContext } from '../../contextProvider';
import { AdvancedPanelOverlayContent } from './advancedPanel';
import { FuelCalculatorOverlayContent } from './fuelCalculator';
import { InputGraphOverlayContent } from './inputGraph';
import { RelativesOverlayContent } from './relatives';
import { StandingsOverlayContent } from './standings';
import { TrackMapOverlayContent } from './trackMap';

// TODO: change to list, remove hardcoded indexes
export function OverlaysContent() {
  const { openOverlayNavIndex } = useAppContext();

  if (openOverlayNavIndex === 0) {
    return <RelativesOverlayContent />;
  }
  if (openOverlayNavIndex === 1) {
    return <StandingsOverlayContent />;
  }
  if (openOverlayNavIndex === 2) {
    return <InputGraphOverlayContent />;
  }
  if (openOverlayNavIndex === 3) {
    return <AdvancedPanelOverlayContent />;
  }
  if (openOverlayNavIndex === 4) {
    return <FuelCalculatorOverlayContent />;
  }
  if (openOverlayNavIndex === 5) {
    return <TrackMapOverlayContent />;
  }
  return null;
}
