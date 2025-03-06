import { useEffect } from 'react';
import { IpcChannels } from '../../constants/ipcChannels';
import { setDocumentDrag } from '../../utils/commonDocumentUtils';

export const useDraggable = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.RECEIVE_DRAGGABLE_UPDATE,
      (isDraggable: boolean) => {
        setDocumentDrag(isDraggable);
      },
    );
  }, []);
};
