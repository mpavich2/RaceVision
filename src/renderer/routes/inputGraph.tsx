import { useEffect } from 'react';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';
import { IPC_CHANNELS } from '../../constants/ipcChannels';
import { InputLineGraph } from '../../components/inputs/graphs/line';

export default function InputGraphApp() {
  useEffect(() => {
    window.electron.ipcRenderer.on(
      IPC_CHANNELS.RECEIVE_OPACITY_UPDATE,
      (opacity: number) => {
        setDocumentOpacity(opacity.toString());
      },
    );

    window.electron.ipcRenderer.on(
      IPC_CHANNELS.RECEIVE_DRAGGABLE_UPDATE,
      (isDraggable: boolean) => {
        setDocumentDrag(isDraggable);
      },
    );
  }, []);

  return (
    <div className="overlayWindow overlayDefaultBackgroundColor">
      <InputLineGraph />

      <div id="draggableWrapper">INPUT GRAPH WINDOW</div>
    </div>
  );
}
