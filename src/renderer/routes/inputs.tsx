import { Inputs } from '../../components/inputs';
import { useDraggable, useOpacity, useTitle } from '../../hooks/document';

export default function InputsApp() {
  useTitle('Inputs');
  useDraggable();
  useOpacity();

  return (
    <div className="overlayWindow roundedOverlayWindow overlayDefaultBackgroundColor">
      <Inputs />

      <div id="draggableWrapper">INPUTS WINDOW</div>
    </div>
  );
}
