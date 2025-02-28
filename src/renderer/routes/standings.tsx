/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';
import { IpcChannels } from '../../constants/ipcChannels';
import { StandingsTable } from '../../components/standings/table';
import { ISessionInfo, ITelemetry } from '../../types/iracing';
import { iracingDataToStandingsInfo } from '../../services/iracingMappingUtils';
import { IStandingsInfo } from '../../types/standings';

// sample data imports
// import SampleSession from '../../sampleData/sampleSessionInfo.json';
// import SampleTelemetry from '../../sampleData/sampleTelemetry.json';

export default function StandingsApp() {
  // iracing data
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo>();
  const [telemetryInfo, setTelemetryInfo] = useState<ITelemetry>();

  // extracted driver data
  const [userInfo, setUserInfo] = useState<IStandingsInfo['userInfo']>();
  const [driverByClassData, setDriverByClassData] = useState<
    IStandingsInfo['driverClasses']
  >([]);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.RECEIVE_OPACITY_UPDATE,
      (opacity: number) => {
        setDocumentOpacity(opacity.toString());
      },
    );

    window.electron.ipcRenderer.on(
      IpcChannels.RECEIVE_DRAGGABLE_UPDATE,
      (isDraggable: boolean) => {
        setDocumentDrag(isDraggable);
      },
    );
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.IRACING_SESSION_INFO,
      (session: ISessionInfo) => {
        setSessionInfo(session);
      },
    );

    window.electron.ipcRenderer.on(
      IpcChannels.IRACING_TELEMETRY_INFO,
      (telemetry: ITelemetry) => {
        setTelemetryInfo(telemetry);
      },
    );
  }, []);

  useEffect(() => {
    if (sessionInfo && telemetryInfo) {
      const driversByClass = iracingDataToStandingsInfo(
        sessionInfo,
        telemetryInfo,
      );

      setDriverByClassData(driversByClass.driverClasses);
      setUserInfo(driversByClass.userInfo);
    }
  }, [sessionInfo, telemetryInfo]);

  return (
    <div className="overlayWindow">
      <StandingsTable
        driverByClassData={driverByClassData}
        userCarIdx={userInfo?.carIdx || 0}
        userCurrentLap={userInfo?.currentLap || 0}
        userCarClass={userInfo?.carClass || ''}
        userPosition={userInfo?.position || 0}
        sessionInfo={sessionInfo}
        telemetry={telemetryInfo}
      />
      <div id="draggableWrapper">STANDINGS WINDOW</div>
    </div>
  );
}
