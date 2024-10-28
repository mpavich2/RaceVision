import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';
import { MainHeader } from '../../header';

export function StandingsOverlayContent() {
  return (
    <div>
      <MainHeader text="Standings" />
      <div>Custom Standings Content Here</div>
      <ResetOverlayPositionButton windowName="standings" />
      <OpenOverlayButton windowName="standings" />
    </div>
  );
}
