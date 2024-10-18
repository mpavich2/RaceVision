import { useAppContext } from '../../contextProvider';
import { AdvancedPanelOverlayContent } from './advancedPanel';
import { InputGraphOverlayContent } from './inputGraph';
import { RelativesOverlayContent } from './relatives';
import { StandingsOverlayContent } from './standings';

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
  return null;
}
