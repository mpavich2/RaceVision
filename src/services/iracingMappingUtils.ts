import { ISessionInfo, ITelemetry } from '../types/iracing';
import { IRelativeDriverData } from '../types/relative';
import carClassInfo from '../sampleData/carClassInfo.json';

const getCarRelativeSpeed = (carClassShortName: string): number => {
  return (
    carClassInfo.find((data) => data.short_name === carClassShortName)
      ?.relative_speed || -1
  );
};

export const getUserCarIdx = (sessionInfo: ISessionInfo): number => {
  return sessionInfo.data.DriverInfo.DriverCarIdx;
};

export const iracingDataToRelativeInfo = (
  sessionInfo: ISessionInfo,
  telemetry: ITelemetry,
): IRelativeDriverData[] => {
  const filteredDrivers = sessionInfo.data.DriverInfo.Drivers.filter(
    (driver) =>
      telemetry.values.CarIdxTrackSurface[driver.CarIdx] !== 'NotInWorld',
  );

  const driverData = filteredDrivers.map((driver) => {
    return {
      carNumber: driver.CarNumber,
      carClass: driver.CarClassShortName,
      driverName: driver.UserName,
      licenseSafetyRatingCombined: driver.LicString,
      irating: driver.IRating,
      carIdx: driver.CarIdx,
      CarClassEstLapTime: driver.CarClassEstLapTime,
    };
  });

  const driverTelemetryData: IRelativeDriverData[] = driverData.map(
    (driver) => {
      const userCarIdx = getUserCarIdx(sessionInfo);

      const driverCurrentLap = telemetry.values.CarIdxLap[driver.carIdx];
      let relativeTime = 0.0;

      // if (driver.carIdx !== userCarIdx) {
      //   let L = telemetry.values.CarIdxLastLapTime[driver.carIdx];

      //   if (L < 0) {
      //     L = driver.CarClassEstLapTime;
      //   }
      //   relativeTime =
      //     telemetry.values.CarIdxEstTime[driver.carIdx] -
      //     telemetry.values.CarIdxEstTime[userCarIdx];

      //   if (relativeTime < -0.5 * L) {
      //     relativeTime += L;
      //   } else {
      //     relativeTime -= L;
      //   }
      // }

      let L = telemetry.values.CarIdxLastLapTime[driver.carIdx];

      if (L < 0) {
        L = driver.CarClassEstLapTime;
      }

      const C = telemetry.values.CarIdxEstTime[driver.carIdx];
      const S = telemetry.values.CarIdxEstTime[userCarIdx];
      const wrap =
        Math.abs(
          telemetry.values.CarIdxLapDistPct[driver.carIdx] -
            telemetry.values.CarIdxLapDistPct[userCarIdx],
        ) > 0.5;

      if (wrap) {
        const difference = C - S;
        relativeTime = S > C ? difference + L : difference - L;
      } else {
        relativeTime = C - S;
      }

      return {
        carNumber: driver.carNumber,
        carClass: driver.carClass,
        driverName: driver.driverName,
        licenseSafetyRatingCombined: driver.licenseSafetyRatingCombined,
        irating: driver.irating,
        carIdx: driver.carIdx,
        position: telemetry.values.CarIdxClassPosition[driver.carIdx],
        relativeTime,
        currentLap: driverCurrentLap,
        lapsCompleted: telemetry.values.CarIdxLapCompleted[driver.carIdx],
        isInPit: telemetry.values.CarIdxOnPitRoad[driver.carIdx],
        isDriverOffTrack: telemetry.values.CarIdxSessionFlags[
          driver.carIdx
        ].includes((x: string) => x.toLowerCase() === 'yellow'),
        iratingDiff: 0,
        carRelativeSpeed: getCarRelativeSpeed(driver.carClass),
      };
    },
  );

  const sortedList = driverTelemetryData.sort(
    (a, b) => b.relativeTime - a.relativeTime,
  );

  return sortedList;
};
