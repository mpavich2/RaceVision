/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { StandingsTable } from '../../components/standings/table';
import { iracingDataToStandingsInfo } from '../../services/iracingMappingUtils';
import { IStandingsInfo } from '../../types/standings';
import { useSession, useTelemetry } from '../../hooks/iracing';
import { useDraggable, useOpacity, useTitle } from '../../hooks/document';

export default function StandingsApp() {
  useTitle('Standings');
  useDraggable();
  useOpacity();

  const sessionInfo = useSession();
  const telemetryInfo = useTelemetry();

  // extracted driver data
  const [userInfo, setUserInfo] = useState<IStandingsInfo['userInfo']>();
  const [driverByClassData, setDriverByClassData] = useState<
    IStandingsInfo['driverClasses']
  >([]);

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
