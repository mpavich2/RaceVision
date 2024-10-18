import { useEffect, useState } from 'react';
import { IPC_CHANNELS } from '../../../../constants/ipcChannels';
import { useAppContext } from '../../contextProvider';

export function SettingsContent() {
  const [opacity, setOpacity] = useState(0.8);
  const { isDarkMode, setIsDarkMode, isDragOverlay, setIsDragOverlay } =
    useAppContext();

  const toggleDarkModeToggled = async () => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.DARK_MODE_TOGGLE,
      !isDarkMode,
    );
    setIsDarkMode(!isDarkMode);
  };

  const handleDragOverlayToggled = () => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.SET_IS_DRAGGABLE,
      !isDragOverlay,
    );
    setIsDragOverlay(!isDragOverlay);
  };

  // TODO: Finish Opacity Settings Below
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(IPC_CHANNELS.SET_OPACITY, opacity);
  }, [opacity]);

  const setAllWindowOpacityButtonClicked = () => {
    if (opacity === 0.8) {
      setOpacity(1);
    } else {
      setOpacity(0.8);
    }
  };

  return (
    <div>
      <div>Custom Settings Content</div>
      <button type="button" onClick={setAllWindowOpacityButtonClicked}>
        Set Opacity
      </button>
      <label htmlFor="toggle" className="slider">
        Drag Switch
        <input
          type="checkbox"
          id="toggle"
          checked={isDragOverlay}
          onChange={handleDragOverlayToggled}
        />
      </label>
      <label htmlFor="toggle" className="slider">
        Dark Mode
        <input
          type="checkbox"
          id="toggle"
          checked={isDarkMode}
          onChange={toggleDarkModeToggled}
        />
      </label>
    </div>
  );
}
