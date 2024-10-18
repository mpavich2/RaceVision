import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';

export function InputGraphOverlayContent() {
  return (
    <div>
      <div>Custom Input Graph Content Here</div>
      <ResetOverlayPositionButton windowName="inputGraph" />
      <OpenOverlayButton windowName="inputGraph" />
    </div>
  );
}
