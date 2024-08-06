/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { RelativeTableRow } from './row';
import './table.css';
import { IPC_CHANNELS } from '../../../constants/ipcChannels';
import { ISessionInfo, ITelemetry } from '../../../types/iracing';
import {
  getUserCarIdx,
  iracingDataToRelativeInfo,
} from '../../../services/iracingMappingUtils';
import { IRelativeDriverData } from '../../../types/relative';

export function RelativeTable() {
  // iracing data
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo>();
  const [telemetryInfo, setTelemetryInfo] = useState<ITelemetry>();

  // extracted user data
  const [userCarIdx, setUserCarIdx] = useState(0);
  const [userCurrentLap, setUserCurrentLap] = useState(0);

  // extracted driver data
  const [driverData, setDriverData] = useState<IRelativeDriverData[]>([]);

  // session extracted data
  const [isRaceSession, setIsRaceSession] = useState(false);

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
    if (sessionInfo) {
      setIsRaceSession(
        sessionInfo.data.SessionInfo.Sessions.some(
          (ses) => ses.SessionType === 'Race',
        ),
      );
    }
  }, [sessionInfo]);

  useEffect(() => {
    if (sessionInfo && telemetryInfo) {
      const drivers = iracingDataToRelativeInfo(sessionInfo, telemetryInfo);
      setDriverData(drivers);
      setUserCarIdx(getUserCarIdx(sessionInfo));
    }
  }, [sessionInfo, telemetryInfo]);

  useEffect(() => {
    setUserCurrentLap(
      driverData.find((d) => d.carIdx === userCarIdx)?.currentLap || -1,
    );
  }, [sessionInfo]);

  useEffect(() => {
    const elm = document.getElementById(userCarIdx.toString());
    elm?.scrollIntoView({ block: 'center' });
  }, [driverData]);

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
                sessionData={{ isRaceSession }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
