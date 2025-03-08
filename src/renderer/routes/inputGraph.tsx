import { InputLineGraph } from '../../components/inputs/graphs/line';
import { useDraggable, useOpacity, useTitle } from '../../hooks/document';

export default function InputGraphApp() {
  useTitle('Input Graph');
  useDraggable();
  useOpacity();

  return (
    <div className="overlayWindow overlayDefaultBackgroundColor">
      <InputLineGraph />

      <div id="draggableWrapper">INPUT GRAPH WINDOW</div>
    </div>
  );
}
