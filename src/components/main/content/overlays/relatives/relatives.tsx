import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';

export function RelativesOverlayContent() {
  return (
    <div>
      <div>Custom Relatives Content Here</div>
      <ResetOverlayPositionButton windowName="relative" />
      <OpenOverlayButton windowName="relative" />
    </div>
  );
}
