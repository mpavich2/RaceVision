import { useEffect, useState } from 'react';
import { IPC_CHANNELS } from '../../constants/ipcChannels';
import './main.css';
import { Sidebar } from '../../components/main/sidebar';

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
// eslint-disable-next-line no-console
//   console.log(arg)
// })
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping'])

const openWindowButtonClicked = (windowName: string) => {
  window.electron.ipcRenderer.sendMessage(
    IPC_CHANNELS.OPEN_SPECIFIC_WINDOW,
    windowName,
  );
};

const resetWindowPositions = () => {
  window.electron.ipcRenderer.sendMessage(IPC_CHANNELS.RESET_WINDOW_POSITIONS);
};

export default function MainApp() {
  const [isToggled, setIsToggled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [opacity, setOpacity] = useState(0.8);

  const toggleDarkModeClicked = async () => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.DARK_MODE_TOGGLE,
      !isDarkMode,
    );
    setIsDarkMode(!isDarkMode);
  };

  const handleSwitchClicked = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.SET_IS_DRAGGABLE,
      isToggled,
    );
  }, [isToggled]);

  const setAllWindowOpacityButtonClicked = () => {
    if (opacity === 0.8) {
      setOpacity(1);
    } else {
      setOpacity(0.8);
    }
  };

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(IPC_CHANNELS.SET_OPACITY, opacity);
  }, [opacity]);

  return (
    <div className="mainBackground">
      <div style={{ maxWidth: '12rem', minWidth: '12rem', flexGrow: 0 }}>
        <Sidebar />
      </div>
      <div style={{ flexGrow: 1 }}>
        <button type="button" onClick={resetWindowPositions}>
          Reset Overlay Positions
        </button>
        <button
          type="button"
          onClick={() => openWindowButtonClicked('standings')}
        >
          Open Standings Window
        </button>
        <button
          type="button"
          onClick={() => openWindowButtonClicked('relative')}
        >
          Open Relative Window
        </button>
        <button
          type="button"
          onClick={() => openWindowButtonClicked('fuel_calculator')}
        >
          Open Fuel Calculator Window
        </button>
        <button type="button" onClick={() => openWindowButtonClicked('inputs')}>
          Open Inputs Window
        </button>
        <button type="button" onClick={setAllWindowOpacityButtonClicked}>
          Set Opacity
        </button>
        <label htmlFor="toggle" className="slider">
          Drag Switch
          <input
            type="checkbox"
            id="toggle"
            checked={isToggled}
            onChange={handleSwitchClicked}
          />
        </label>
        <label htmlFor="toggle" className="slider">
          Dark Mode
          <input
            type="checkbox"
            id="toggle"
            checked={isDarkMode}
            onChange={toggleDarkModeClicked}
          />
        </label>
      </div>
    </div>
  );
}
