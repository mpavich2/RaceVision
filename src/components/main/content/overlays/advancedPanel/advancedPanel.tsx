import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';

export function AdvancedPanelOverlayContent() {
  return (
    <div>
      <div>Custom Advanced Panel Content Here</div>
      <ResetOverlayPositionButton windowName="inputs" />
      <OpenOverlayButton windowName="inputs" />
    </div>
  );
}
