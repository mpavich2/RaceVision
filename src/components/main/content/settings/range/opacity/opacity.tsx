/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { RangeSlider } from '../../../../../common/range';
import { IpcChannels } from '../../../../../../constants/ipcChannels';
import { useAppContext } from '../../../../contextProvider';
import { IUserSettings } from '../../../../../../types/userSettings';

const DEFAULT_OPACITY = 80;

export function OpacityRangeSlider() {
  const { opacity, setOpacity } = useAppContext();

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(IpcChannels.GET_USER_SETTINGS)
      .then((userSettings: IUserSettings) =>
        setOpacity(userSettings.opacity * 100),
      )
      .catch(() => setOpacity(DEFAULT_OPACITY));
  }, []);

  useEffect(() => {
    const decimalOpacityValue = opacity / 100;

    window.electron.ipcRenderer.sendMessage(
      IpcChannels.SET_OPACITY,
      decimalOpacityValue,
    );
  }, [opacity]);

  const handleResetClicked = () => {
    setOpacity(DEFAULT_OPACITY);
  };

  return (
    <div>
      <RangeSlider
        value={opacity}
        setValue={setOpacity}
        headerText="Background Opacity"
      />

      <button
        type="button"
        onClick={handleResetClicked}
        className="secondaryButton"
        style={{ marginTop: '0.5rem' }}
      >
        Reset Opacity
      </button>
    </div>
  );
}
