/* eslint-disable no-undef */
import { IPC_CHANNELS } from '../../../../constants/ipcChannels';

export function OpenOverlayButton(props: { windowName: string }) {
  const openWindowButtonClicked = (windowName: string) => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.OPEN_SPECIFIC_WINDOW,
      windowName,
    );
  };

  return (
    <button
      type="button"
      onClick={() => openWindowButtonClicked(props.windowName)}
      className="primaryButton"
    >
      Open Overlay
    </button>
  );
}
