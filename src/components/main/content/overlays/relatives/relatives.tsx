import { OpenOverlayButton } from '../../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../../buttons/resetOverlay';
import { MainHeader } from '../../header';

export function RelativesOverlayContent() {
  return (
    <div>
      <MainHeader text="Relatives" />
      <div>Custom Relatives Content Here</div>
      <ResetOverlayPositionButton windowName="relative" />
      <OpenOverlayButton windowName="relative" />
    </div>
  );
}
