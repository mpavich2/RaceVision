/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { RelativeFooter } from '../../components/relative/footer';
import { RelativeHeader } from '../../components/relative/header';
import { RelativeTable } from '../../components/relative/table';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../../utils/commonDocumentUtils';
import { IPC_CHANNELS } from '../../constants/ipcChannels';
import { ISessionInfo, ITelemetry } from '../../types/iracing';
import { IRelativeDriverData } from '../../types/relative';
import {
  getUserCarIdx,
  iracingDataToRelativeInfo,
  isRaceSession,
} from '../../services/iracingMappingUtils';
import { calculateExpectedIratingDiff } from '../../services/iratingCalculator';
import SampleSession from '../../sampleData/sampleSessionInfo.json';
import SampleTelemetry from '../../sampleData/sampleTelemetry.json';

export default function RelativeApp() {
  // iracing data
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo>(
    SampleSession as any,
  );
  const [telemetryInfo, setTelemetryInfo] =
    useState<ITelemetry>(SampleTelemetry);

  // extracted user data
  const [userCarIdx, setUserCarIdx] = useState(0);
  const [userCurrentLap, setUserCurrentLap] = useState(0);

  // extracted driver data
  const [driverData, setDriverData] = useState<IRelativeDriverData[]>([]);

  // session extracted data
  const [isRacingSession, setIsRaceSession] = useState(false);
  const [sessionSof, setSessionSof] = useState(0);

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

  useEffect(() => {
    if (sessionInfo && telemetryInfo) {
      let drivers = iracingDataToRelativeInfo(sessionInfo, telemetryInfo);

      const iratingDiffs = calculateExpectedIratingDiff(drivers);
      setSessionSof(iratingDiffs.sof);

      if (isRacingSession) {
        drivers = drivers.map((d1) => {
          const matchedDriver = iratingDiffs.drivers.find(
            (d2) => d2.driverName === d1.driverName,
          );

          return {
            ...d1,
            iratingDiff: matchedDriver?.iratingDiff || 0,
          };
        });
      }

      drivers = drivers
        .filter((d) => d.isDriverOnTrack || d.carIdx === userCarIdx)
        .sort((a, b) => b.relativeTime - a.relativeTime);

      setDriverData(drivers);
      setUserCarIdx(getUserCarIdx(sessionInfo));
    }
  }, [sessionInfo, telemetryInfo]);

  useEffect(() => {
    setUserCurrentLap(
      driverData.find((d) => d.carIdx === userCarIdx)?.currentLap || -1,
    );

    if (sessionInfo && telemetryInfo) {
      setIsRaceSession(
        isRaceSession(sessionInfo, telemetryInfo.values.SessionNum),
      );
    }
  }, [sessionInfo]);

  return (
    <div className="overlayWindow overlayDefaultBackgroundColor">
      <RelativeHeader
        telemetry={telemetryInfo}
        sessionInfo={sessionInfo}
        strengthOfField={sessionSof}
      />
      <RelativeTable
        driverData={driverData}
        userCarIdx={userCarIdx}
        userCurrentLap={userCurrentLap}
        isRaceSession={isRacingSession}
      />
      <RelativeFooter
        userCurrentLap={userCurrentLap}
        telemetry={telemetryInfo}
        sessionInfo={sessionInfo}
      />

      <div id="draggableWrapper">RELATIVE WINDOW</div>
    </div>
  );
}
