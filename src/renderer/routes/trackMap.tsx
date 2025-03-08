import { useEffect, useState } from 'react';
import { ISessionInfo } from '../../types/iracing';
import { TrackMap } from '../../components/trackMap/trackMap';
import { getUserCarIdx } from '../../services/iracingMappingUtils';
import { useSession, useTelemetry } from '../../hooks/iracing';
import { useDraggable, useOpacity, useTitle } from '../../hooks/document';

export default function TrackMapApp() {
  useTitle('Track Map');
  useDraggable();
  useOpacity();

  const sessionInfo = useSession();
  const telemetryInfo = useTelemetry();

  const [trackId, setTrackId] = useState<number>();
  const [driverData, setDriverData] = useState<
    {
      progress: number;
      isPlayer: boolean;
      driver: ISessionInfo['data']['DriverInfo']['Drivers'][0];
    }[]
  >([]);

  useEffect(() => {
    if (sessionInfo) {
      setTrackId(sessionInfo.data.WeekendInfo.TrackID);
    }
  }, [sessionInfo]);

  useEffect(() => {
    if (sessionInfo && telemetryInfo) {
      const userIdx = getUserCarIdx(sessionInfo);
      const drivers = sessionInfo.data.DriverInfo.Drivers;
      const driversLapDist = telemetryInfo.values.CarIdxLapDistPct.map(
        (pct) => Math.round(pct * 1000) / 1000,
      );

      const driversTrackData = drivers
        .map((driver) => ({
          driver,
          progress: driversLapDist[driver.CarIdx],
          isPlayer: driver.CarIdx === userIdx,
        }))
        .filter((d) => d.progress > -1)
        .filter((d) => d.driver.CarIdx > 0);

      setDriverData(driversTrackData);
    }
  }, [sessionInfo, telemetryInfo]);

  return (
    <div className="overlayWindow">
      <TrackMap trackId={trackId} drivers={driverData} />
      <div id="draggableWrapper">TRACK MAP WINDOW</div>
    </div>
  );
}
