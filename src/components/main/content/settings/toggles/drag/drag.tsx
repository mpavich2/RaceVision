import { IpcChannels } from '../../../../../../constants/ipcChannels';
import { ToggleSwitch } from '../../../../../common/toggle';
import { useAppContext } from '../../../../contextProvider';

export function DragToggle() {
  const { isDragOverlay, setIsDragOverlay } = useAppContext();

  const handleDragOverlayToggled = () => {
    window.electron.ipcRenderer.sendMessage(
      IpcChannels.SET_IS_DRAGGABLE,
      !isDragOverlay,
    );
    setIsDragOverlay(!isDragOverlay);
  };

  return (
    <ToggleSwitch
      handleToggle={handleDragOverlayToggled}
      isOn={!isDragOverlay}
      headerText="Lock Overlay Positions"
    />
  );
}
