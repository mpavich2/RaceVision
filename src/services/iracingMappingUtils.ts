import { ISessionInfo, ITelemetry } from '../types/iracing';
import { IRelativeDriverData } from '../types/relative';

// const getCarRelativeSpeed = (carClassShortName: string): number => {
//   return (
//     carClassInfo.find((data) => data.short_name === carClassShortName)
//       ?.relative_speed || -1
//   );
// };

export const getUserCarIdx = (sessionInfo: ISessionInfo): number => {
  return sessionInfo.data.DriverInfo.DriverCarIdx;
};

export const iracingDataToRelativeInfo = (
  sessionInfo: ISessionInfo,
  telemetry: ITelemetry,
): IRelativeDriverData[] => {
  const filteredDrivers = sessionInfo.data.DriverInfo.Drivers.filter(
    (driver) => driver.UserName !== 'Pace Car',
  );

  const driverData = filteredDrivers.map((driver) => {
    return {
      carNumber: driver.CarNumber,
      carClass: driver.CarClassShortName,
      driverName: driver.UserName,
      licenseSafetyRatingCombined: driver.LicString,
      licenseColor: driver.LicColor,
      irating: driver.IRating,
      carIdx: driver.CarIdx,
      carClassEstLapTime: driver.CarClassEstLapTime,
      carClassColor: driver.CarClassColor.toString(16),
      isSpectator: driver.IsSpectator === 1,
      carRelativeSpeed: driver.CarClassRelSpeed,
    };
  });

  const driverTelemetryData: IRelativeDriverData[] = driverData.map(
    (driver) => {
      const userCarIdx = getUserCarIdx(sessionInfo);

      const driverCurrentLap = telemetry.values.CarIdxLap[driver.carIdx];
      let relativeTime = 0.0;

      let L = telemetry.values.CarIdxLastLapTime[driver.carIdx];

      if (L < 0) {
        L =
          telemetry.values.CarIdxBestLapTime[driver.carIdx] ||
          driver.carClassEstLapTime;
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
        isDriverOffTrack: false, // determine in order to show yellow flag
        iratingDiff: 0,
        carRelativeSpeed: driver.carRelativeSpeed,
        carClassColor: driver.carClassColor,
        licenseColor: driver.licenseColor,
        isDriverInLobby:
          telemetry.values.CarIdxTrackSurface[driver.carIdx] !== 'NotInWorld',
        didNotStart: telemetry.values.CarIdxClassPosition[driver.carIdx] === 0,
        sessionFlags: telemetry.values.CarIdxSessionFlags[driver.carIdx],
        isSpectator: driver.isSpectator,
        isDriverOnTrack:
          telemetry.values.CarIdxTrackSurface[driver.carIdx] !== 'NotInWorld',
      };
    },
  );

  return driverTelemetryData;
};
