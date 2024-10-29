import { IPC_CHANNELS } from '../../../../../../constants/ipcChannels';
import { ToggleSwitch } from '../../../../../common/toggle';
import { useAppContext } from '../../../../contextProvider';

export function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useAppContext();

  const toggleDarkMode = () => {
    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.DARK_MODE_TOGGLE,
      !isDarkMode,
    );
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ToggleSwitch
      handleToggle={toggleDarkMode}
      isOn={isDarkMode}
      headerText="Dark Mode"
    />
  );
}
