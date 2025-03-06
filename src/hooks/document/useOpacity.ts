import { useEffect } from 'react';
import { IpcChannels } from '../../constants/ipcChannels';
import { setDocumentOpacity } from '../../utils/commonDocumentUtils';

export const useOpacity = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.RECEIVE_OPACITY_UPDATE,
      (opacity: number) => {
        setDocumentOpacity(opacity.toString());
      },
    );
  }, []);
};
