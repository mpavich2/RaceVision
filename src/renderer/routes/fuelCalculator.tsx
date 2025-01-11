import { useEffect, useState } from 'react';
import { IPC_CHANNELS } from '../../constants/ipcChannels';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';
import { FuelLevel } from '../../components/fuelCalculator/fuelLevel';
import { ISessionInfo, ITelemetry } from '../../types/iracing';

// sample data imports
// import SampleSession from '../../sampleData/sampleSessionInfo.json';
// import SampleTelemetry from '../../sampleData/sampleTelemetry.json';

export default function FuelCalculatorApp() {
  // iracing data
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo>();
  const [telemetryInfo, setTelemetryInfo] = useState<ITelemetry>();

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IPC_CHANNELS.RECEIVE_OPACITY_UPDATE,
      (opacity: number) => {
        setDocumentOpacity(opacity.toString());
      },
    );

    window.electron.ipcRenderer.on(
      IPC_CHANNELS.RECEIVE_DRAGGABLE_UPDATE,
      (isDraggable: boolean) => {
        setDocumentDrag(isDraggable);
      },
    );
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IPC_CHANNELS.IRACING_SESSION_INFO,
      (session: ISessionInfo) => {
        setSessionInfo(session);
      },
    );

    window.electron.ipcRenderer.on(
      IPC_CHANNELS.IRACING_TELEMETRY_INFO,
      (telemetry: ITelemetry) => {
        setTelemetryInfo(telemetry);
      },
    );
  }, []);

  return (
    <div className="overlayWindow overlayDefaultBackgroundColor">
      <FuelLevel
        curFuel={telemetryInfo?.values.FuelLevel}
        maxFuel={sessionInfo?.data.DriverInfo.DriverCarFuelMaxLtr}
      />
      <div id="draggableWrapper">FUEL CALCULATOR WINDOW</div>
    </div>
  );
}
