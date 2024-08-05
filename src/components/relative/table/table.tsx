import { useEffect, useState } from 'react';
import { generateSessionClassColors } from '../../../services/generateSessionColors';
import { ISessionClassColorInfoMap } from '../../../types/sessionClassColorInfo';
import { RelativeTableRow } from './row';
import './table.css';
import { IPC_CHANNELS } from '../../../constants/ipcChannels';
import { ISessionInfo, ITelemetry } from '../../../types/iracing';
import {
  getUserCarIdx,
  iracingDataToRelativeInfo,
} from '../../../services/iracingMappingUtils';
import { IRelativeDriverData } from '../../../types/relative';

// change to actual data
// PlayerCarClassPosition
// PlayerCarClass
// PlayerCarIdx
// PlayerCarTeamIncidentCount
// PlayerCarMyIncidentCount
export function RelativeTable() {
  const [classColorInfo, setClassColorInfo] =
    useState<ISessionClassColorInfoMap>({});
  const [userCarIdx, setUserCarIdx] = useState(0); // assume set right when connection made
  const [userCurrentLap, setUserCurrentLap] = useState(0);
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo>();
  const [telemetryInfo, setTelemetryInfo] = useState<ITelemetry>();
  const [driverData, setDriverData] = useState<IRelativeDriverData[]>([]);

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
      const drivers = iracingDataToRelativeInfo(sessionInfo, telemetryInfo);
      setDriverData(drivers);
      setUserCarIdx(getUserCarIdx(sessionInfo));

      // telemetryInfo.values.CarIdxSessionFlags.forEach((driverFlags) => {
      //   if (
      //     driverFlags.includes(
      //       (x: string) => x.toLocaleLowerCase() === 'yellow',
      //     )
      //   ) {
      //     console.log('Yellow Found!');
      //   }
      // });
    }
  }, [sessionInfo, telemetryInfo]);

  // TODO: refactor start
  const handleResize = () => {
    const elm = document.getElementById(userCarIdx.toString());
    elm?.scrollIntoView({ block: 'center' });
  };

  const debounce = (fn: any, delay: any) => {
    let timerId: any;
    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };
  window.addEventListener('resize', debounce(handleResize, 5));
  // TODO: refactor end

  useEffect(() => {
    setUserCurrentLap(
      driverData.find((d) => d.carIdx === userCarIdx)?.currentLap || -1,
    );
  }, [sessionInfo]);

  // potentially move out of useEffect, need to test first
  // look into caching this instead of generating each event
  useEffect(() => {
    if (!classColorInfo) {
      setClassColorInfo(generateSessionClassColors(driverData));
    }

    const elm = document.getElementById(userCarIdx.toString());
    elm?.scrollIntoView({ block: 'center' });
  }, [driverData]);

  return (
    <div className="relativeTableWrapper">
      <table className="relativeTable">
        <tbody>
          {driverData.map((d) => {
            return (
              <RelativeTableRow
                key={d.driverName}
                driverData={d}
                userData={{
                  userCarIdx,
                  userCurrentLap,
                }}
                classColorInfo={classColorInfo[d.carRelativeSpeed]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
