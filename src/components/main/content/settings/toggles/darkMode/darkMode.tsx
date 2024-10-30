/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { IPC_CHANNELS } from '../../../../../../constants/ipcChannels';
import { IUserSettings } from '../../../../../../types/userSettings';
import { ToggleSwitch } from '../../../../../common/toggle';
import { useAppContext } from '../../../../contextProvider';

export function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useAppContext();

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(IPC_CHANNELS.GET_USER_SETTINGS)
      .then((userSettings: IUserSettings) =>
        setIsDarkMode(userSettings.isDarkMode),
      )
      .catch(() => setIsDarkMode(false));
  }, []);

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
