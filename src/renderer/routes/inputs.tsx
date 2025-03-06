import { Inputs } from '../../components/inputs';
import { useDraggable, useOpacity } from '../../hooks/document';

export default function InputsApp() {
  useDraggable();
  useOpacity();

  return (
    <div className="overlayWindow roundedOverlayWindow overlayDefaultBackgroundColor">
      <Inputs />

      <div id="draggableWrapper">INPUTS WINDOW</div>
    </div>
  );
}
