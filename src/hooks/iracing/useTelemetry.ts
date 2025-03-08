import { useEffect, useState } from 'react';
import { ITelemetry } from '../../types/iracing';
import { IpcChannels } from '../../constants/ipcChannels';

// sample data imports
import SampleTelemetry from '../../sampleData/sampleTelemetry.json';

export const useTelemetry = () => {
  const [telemetryInfo, setTelemetryInfo] =
    useState<ITelemetry>(SampleTelemetry);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.IRACING_TELEMETRY_INFO,
      (telemetry: ITelemetry) => {
        setTelemetryInfo(telemetry);
      },
    );
  }, []);

  return telemetryInfo;
};
