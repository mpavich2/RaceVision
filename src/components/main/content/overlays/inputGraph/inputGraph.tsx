import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';
import { MainHeader } from '../../header';

export function InputGraphOverlayContent() {
  return (
    <div>
      <MainHeader text="Input Graph" />
      <div>Custom Input Graph Content Here</div>
      <ResetOverlayPositionButton windowName="inputGraph" />
      <OpenOverlayButton windowName="inputGraph" />
    </div>
  );
}
