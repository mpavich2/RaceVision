/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { IPC_CHANNELS } from '../../../../constants/ipcChannels';

export function OpenOverlayButton(props: { windowName: string }) {
  const [isWindowOpen, setIsWindowOpen] = useState(true);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(IPC_CHANNELS.IS_WINDOW_OPEN, props.windowName)
      .then((result: boolean) => setIsWindowOpen(result))
      .catch(() => setIsWindowOpen(false));
  }, []);

  const openWindowButtonClicked = (windowName: string) => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.OPEN_SPECIFIC_WINDOW,
      windowName,
    );

    setIsWindowOpen(!isWindowOpen);
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
