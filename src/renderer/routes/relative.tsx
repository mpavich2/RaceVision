/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { RelativeFooter } from '../../components/relative/footer';
import { RelativeHeader } from '../../components/relative/header';
import { RelativeTable } from '../../components/relative/table';
import { IRelativeDriverData } from '../../types/relative';
import {
  getUserCarIdx,
  iracingDataToRelativeInfo,
  isRaceSession,
} from '../../services/iracingMappingUtils';
import { calculateExpectedIratingDiff } from '../../services/iratingCalculator';
import { useTelemetry, useSession } from '../../hooks/iracing';
import { useDraggable, useOpacity, useTitle } from '../../hooks/document';

export default function RelativeApp() {
  useTitle('Relative');
  useDraggable();
  useOpacity();

  const sessionInfo = useSession();
  const telemetryInfo = useTelemetry();

  // extracted user data
  const [userCarIdx, setUserCarIdx] = useState(0);
  const [userCurrentLap, setUserCurrentLap] = useState(0);

  // extracted driver data
  const [driverData, setDriverData] = useState<IRelativeDriverData[]>([]);

  // session extracted data
  const [isRacingSession, setIsRaceSession] = useState(false);
  const [sessionSof, setSessionSof] = useState(0);

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
