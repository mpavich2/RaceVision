import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';
import { MainHeader } from '../../header';

export function AdvancedPanelOverlayContent() {
  return (
    <div>
      <MainHeader text="Advanced Panel" />
      <div>Custom Advanced Panel Content Here</div>
      <ResetOverlayPositionButton windowName="inputs" />
      <OpenOverlayButton windowName="inputs" />
    </div>
  );
}
