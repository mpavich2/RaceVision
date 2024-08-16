import { useEffect } from 'react';
import { RelativeFooter } from '../../components/relative/footer';
import { RelativeHeader } from '../../components/relative/header';
import { RelativeTable } from '../../components/relative/table';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';
import { IPC_CHANNELS } from '../../constants/ipcChannels';

export default function RelativeApp() {
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
      <RelativeHeader />
      <RelativeTable />
      <RelativeFooter />

      <div id="draggableWrapper">RELATIVE WINDOW</div>
    </div>
  );
}
