import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';

export function StandingsOverlayContent() {
  return (
    <div>
      <div>Custom Standings Content Here</div>
      <ResetOverlayPositionButton windowName="standings" />
      <OpenOverlayButton windowName="standings" />
    </div>
  );
}
