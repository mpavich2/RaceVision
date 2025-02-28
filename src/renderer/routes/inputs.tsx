import { useEffect } from 'react';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';
import { IpcChannels } from '../../constants/ipcChannels';
import { Inputs } from '../../components/inputs';

export default function InputsApp() {
  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.RECEIVE_OPACITY_UPDATE,
      (opacity: number) => {
        setDocumentOpacity(opacity.toString());
      },
    );

    window.electron.ipcRenderer.on(
      IpcChannels.RECEIVE_DRAGGABLE_UPDATE,
      (isDraggable: boolean) => {
        setDocumentDrag(isDraggable);
      },
    );
  }, []);

  return (
    <div className="overlayWindow roundedOverlayWindow overlayDefaultBackgroundColor">
      <Inputs />

      <div id="draggableWrapper">INPUTS WINDOW</div>
    </div>
  );
}
