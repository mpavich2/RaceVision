import { useEffect } from 'react';
import { RangeSlider } from '../../../../../common/range';
import { IPC_CHANNELS } from '../../../../../../constants/ipcChannels';
import { useAppContext } from '../../../../contextProvider';

const DEFAULT_OPACITY = 80;

export function OpacityRangeSlider() {
  const { opacity, setOpacity } = useAppContext();

  useEffect(() => {
    const decimalOpacityValue = opacity / 100;

    window.electron.ipcRenderer.sendMessage(
      IPC_CHANNELS.SET_OPACITY,
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

      <button type="button" onClick={handleResetClicked}>
        Reset Opacity
      </button>
    </div>
  );
}
