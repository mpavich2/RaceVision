/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ToggleSwitch } from '../../../../../../common/toggle';

export function BackgroundToggle() {
  const [isBackgroundActive, setIsBackgroundActive] = useState(false);

  useEffect(() => {
    // window.electron.ipcRenderer
    //   .invoke(IpcChannels.GET_USER_SETTINGS)
    //   .then((userSettings: IUserSettings) =>
    //     setIsTurnsActive(userSettings.isDarkMode),
    //   )
    //   .catch(() => setIsTurnsActive(false));
  }, []);

  const toggleBackground = () => {
    // window.electron.ipcRenderer.sendMessage(
    //   IpcChannels.DARK_MODE_TOGGLE,
    //   !isTurnsActive,
    // );
    setIsBackgroundActive(!isBackgroundActive);
  };

  return (
    <ToggleSwitch
      handleToggle={toggleBackground}
      isOn={isBackgroundActive}
      headerText="Background"
    />
  );
}
