import { useEffect } from 'react';
import { IPC_CHANNELS } from '../../constants/ipcChannels';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';

export default function FuelCalculatorApp() {
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
      <div id="draggableWrapper">FUEL CALCULATOR WINDOW</div>
    </div>
  );
}
