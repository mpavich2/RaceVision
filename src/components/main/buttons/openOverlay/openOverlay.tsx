/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { IpcChannels } from '../../../../constants/ipcChannels';

export function OpenOverlayButton(props: { windowName: string }) {
  const [isWindowOpen, setIsWindowOpen] = useState(true);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.WINDOW_OPEN_STATUS,
      (result: boolean) => {
        setIsWindowOpen(result);
      },
    );
  }, []);

  const openWindowButtonClicked = (windowName: string) => {
    window.electron.ipcRenderer.sendMessage(
      IpcChannels.OPEN_SPECIFIC_WINDOW,
      windowName,
    );
  };

  return (
    <button
      type="button"
      onClick={() => openWindowButtonClicked(props.windowName)}
      className="primaryButton"
    >
      {isWindowOpen ? 'Close' : 'Open'} Overlay
    </button>
  );
}
