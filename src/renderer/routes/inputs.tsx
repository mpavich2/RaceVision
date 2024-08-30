import { useEffect } from 'react';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';
import { IPC_CHANNELS } from '../../constants/ipcChannels';
import { InputBarGraph } from '../../components/inputs/graphs/bar';

export default function InputsApp() {
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
    <div className="overlayWindow">
      <InputBarGraph />

      <div id="draggableWrapper">INPUTS WINDOW</div>
    </div>
  );
}
