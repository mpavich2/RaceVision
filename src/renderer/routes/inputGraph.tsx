import { InputLineGraph } from '../../components/inputs/graphs/line';
import { useDraggable, useOpacity } from '../../hooks/document';

export default function InputGraphApp() {
  useDraggable();
  useOpacity();

  return (
    <div className="overlayWindow overlayDefaultBackgroundColor">
      <InputLineGraph />

      <div id="draggableWrapper">INPUT GRAPH WINDOW</div>
    </div>
  );
}
