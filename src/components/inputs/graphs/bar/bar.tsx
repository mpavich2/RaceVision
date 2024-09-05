import { useEffect, useState } from 'react';
import { InputBar } from './inputBar';
import { InputType } from '../../../../types/inputType';
import './bar.css';
import { IPC_CHANNELS } from '../../../../constants/ipcChannels';
import { ITelemetry } from '../../../../types/iracing';

export function InputBarGraph() {
  const [throttleInput, setThrottleInput] = useState(0);
  const [brakeInput, setBrakeInput] = useState(0);
  const [clutchInput, setClutchInput] = useState(0);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IPC_CHANNELS.IRACING_TELEMETRY_INFO,
      (telemetry: ITelemetry) => {
        setThrottleInput(telemetry.values.ThrottleRaw * 100);
        setBrakeInput(telemetry.values.BrakeRaw * 100);
        setClutchInput((1 - telemetry.values.ClutchRaw) * 100);
      },
    );
  }, []);

  return (
    <div className="inputBarsWrapper">
      <InputBar value={clutchInput} inputType={InputType.CLUTCH} />
      <InputBar value={brakeInput} inputType={InputType.BRAKE} />
      <InputBar value={throttleInput} inputType={InputType.THROTTLE} />
    </div>
  );
}
