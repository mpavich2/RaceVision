/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { IpcChannels } from '../../../../../../constants/ipcChannels';
import { IUserSettings } from '../../../../../../types/userSettings';
import { ToggleSwitch } from '../../../../../common/toggle';
import { useAppContext } from '../../../../contextProvider';

export function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useAppContext();

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(IpcChannels.GET_USER_SETTINGS)
      .then((userSettings: IUserSettings) =>
        setIsDarkMode(userSettings.isDarkMode),
      )
      .catch(() => setIsDarkMode(false));
  }, []);

  const toggleDarkMode = () => {
    window.electron.ipcRenderer.sendMessage(
      IpcChannels.DARK_MODE_TOGGLE,
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
