/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ToggleSwitch } from '../../../../../../common/toggle';

export function TurnsToggle() {
  const [isTurnsActive, setIsTurnsActive] = useState(false);

  useEffect(() => {
    // window.electron.ipcRenderer
    //   .invoke(IpcChannels.GET_USER_SETTINGS)
    //   .then((userSettings: IUserSettings) =>
    //     setIsTurnsActive(userSettings.isDarkMode),
    //   )
    //   .catch(() => setIsTurnsActive(false));
  }, []);

  const toggleTurns = () => {
    // window.electron.ipcRenderer.sendMessage(
    //   IpcChannels.DARK_MODE_TOGGLE,
    //   !isTurnsActive,
    // );
    setIsTurnsActive(!isTurnsActive);
  };

  return (
    <ToggleSwitch
      handleToggle={toggleTurns}
      isOn={isTurnsActive}
      headerText="Turn Names"
    />
  );
}
