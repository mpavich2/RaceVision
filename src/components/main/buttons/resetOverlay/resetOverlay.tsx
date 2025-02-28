import { IpcChannels } from '../../../../constants/ipcChannels';

export function ResetOverlayPositionButton(props: { windowName?: string }) {
  const resetWindowPositions = () => {
    window.electron.ipcRenderer.sendMessage(
      IpcChannels.RESET_WINDOW_POSITIONS,
    );
  };

  const resetSpecificWindowPosition = () => {
    window.electron.ipcRenderer.sendMessage(
      IpcChannels.RESET_SPECIFIC_WINDOW_POSITION,
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
    <button type="button" onClick={handleOnClick} className="secondaryButton">
      Reset Overlay{!props.windowName && 's'}
    </button>
  );
}
