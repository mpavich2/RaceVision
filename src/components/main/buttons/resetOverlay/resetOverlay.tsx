import { IPC_CHANNELS } from '../../../../constants/ipcChannels';

export function ResetOverlayPositionButton(props: { windowName?: string }) {
  const resetWindowPositions = () => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.RESET_WINDOW_POSITIONS,
    );
  };

  const resetSpecificWindowPosition = () => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.RESET_SPECIFIC_WINDOW_POSITION,
      props.windowName,
    );
  };

  const handleOnClick = () => {
    if (!props.windowName) {
      resetWindowPositions();
    } else {
      resetSpecificWindowPosition();
    }
  };

  return (
    <button type="button" onClick={handleOnClick}>
      Reset Overlay Positions
    </button>
  );
}
