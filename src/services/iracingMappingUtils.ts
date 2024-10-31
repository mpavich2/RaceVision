import { groupBy } from 'lodash';
import { ISessionInfo, ITelemetry } from '../types/iracing';
import { IRelativeDriverData } from '../types/relative';
import { IDriverClasses, IStandingsInfo } from '../types/standings';

export const getUserData = (
  sessionInfo: ISessionInfo,
  telemetry: ITelemetry,
) => {
  const userCarIdx = sessionInfo.data.DriverInfo.DriverCarIdx;
  const user = sessionInfo.data.DriverInfo.Drivers.find(
    (d) => d.CarIdx === userCarIdx,
  );

  if (!user) {
    return null;
  }

  return {
    position: telemetry.values.CarIdxPosition[userCarIdx],
    carClass: user.CarClassShortName,
    currentLap: telemetry.values.CarIdxLap[userCarIdx],
    userCarIdx,
  };
};

export const getUserCarIdx = (sessionInfo: ISessionInfo): number => {
  return sessionInfo.data.DriverInfo.DriverCarIdx;
};

export const getUserCarClass = (
  sessionInfo: ISessionInfo,
  userCarIdx: number,
): string => {
  return (
    sessionInfo.data.DriverInfo.Drivers.find((d) => d.CarIdx === userCarIdx)
      ?.CarClassShortName || ''
  );
};

export const getUserCurrentLap = (
  telemetry: ITelemetry,
  userCarIdx: number,
): number => {
  return telemetry.values.CarIdxLap[userCarIdx] || -1;
};

export const getCurrentSession = (
  sessionInfo: ISessionInfo,
  telemetrySessionNum: number,
) => {
  return sessionInfo.data.SessionInfo.Sessions.find(
    (s) => s.SessionNum === telemetrySessionNum,
  );
};

export const getSessionType = (
  sessionInfo: ISessionInfo,
  telemetrySessionNum: number,
) => {
  return (
    getCurrentSession(sessionInfo, telemetrySessionNum)?.SessionName ||
    'Practice'
  );
};

export const isRaceSession = (
  sessionInfo: ISessionInfo,
  telemetrySessionNum: number,
) => {
  return (
    getSessionType(sessionInfo, telemetrySessionNum).toLowerCase() === 'race'
  );
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
      carClass: driver.CarClassShortName || driver.CarScreenNameShort,
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

      const L = driver.carClassEstLapTime;

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
        isDriverOffTrack:
          telemetry.values.CarIdxTrackSurface[driver.carIdx] === 'OffTrack',
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

// TODO: use Qualifying time while ResultsPositions is null (potentially) during race pace lap
export const iracingDataToStandingsInfo = (
  sessionInfo: ISessionInfo,
  telemetry: ITelemetry,
): IStandingsInfo => {
  const filteredDrivers = sessionInfo.data.DriverInfo.Drivers.filter(
    (driver) => driver.UserName !== 'Pace Car',
  );

  const driverData = filteredDrivers.map((driver) => {
    return {
      carNumber: driver.CarNumber,
      carClass: driver.CarClassShortName || driver.CarScreenNameShort,
      driverName: driver.UserName,
      licenseSafetyRatingCombined: driver.LicString,
      licenseColor: driver.LicColor,
      irating: driver.IRating,
      carIdx: driver.CarIdx,
      carClassEstLapTime: driver.CarClassEstLapTime,
      carClassColor: driver.CarClassColor.toString(16),
      isSpectator: driver.IsSpectator === 1,
      classRelativeSpeed: driver.CarClassRelSpeed,
      fastestLap:
        getCurrentSession(
          sessionInfo,
          telemetry.values.SessionNum,
        )?.ResultsPositions?.find((d) => d.CarIdx === driver.CarIdx)
          ?.FastestTime || -1,
      lastLap:
        getCurrentSession(
          sessionInfo,
          telemetry.values.SessionNum,
        )?.ResultsPositions?.find((d) => d.CarIdx === driver.CarIdx)
          ?.LastTime || -1,
    };
  });

  const mappedDrivers = driverData.map((driver) => {
    const position = telemetry.values.CarIdxClassPosition[driver.carIdx];

    return {
      position: position >= 0 ? position : 0,
      carNumber: driver.carNumber,
      carClass: driver.carClass,
      driverName: driver.driverName,
      irating: driver.irating,
      carIdx: driver.carIdx,
      carClassColor: driver.carClassColor,
      isSpectator: driver.isSpectator,
      lastLap: driver.lastLap,
      classRelativeSpeed: driver.classRelativeSpeed,
      isDriverOffTrack:
        telemetry.values.CarIdxTrackSurface[driver.carIdx] === 'OffTrack',
      fastestLap: driver.fastestLap,
      estimatedLap: telemetry.values.CarIdxF2Time[driver.carIdx],
      isDriverInPit:
        telemetry.values.CarIdxOnPitRoad[driver.carIdx] ||
        telemetry.values.CarIdxTrackSurface[driver.carIdx] === 'NotInWorld' ||
        telemetry.values.CarIdxTrackSurface[driver.carIdx] === 'InPitStall',
    };
  });

  const userCarIdx = sessionInfo.data.DriverInfo.DriverCarIdx;
  const userDriver = mappedDrivers.find((d) => d.carIdx === userCarIdx);

  const groupByClassDrivers = groupBy(
    mappedDrivers,
    (driver) => driver.carClass,
  );

  const isRaceSes = isRaceSession(sessionInfo, telemetry.values.SessionNum);
  const sortedDriverClasses: IDriverClasses[] = [];
  Object.keys(groupByClassDrivers).forEach((driverClass) => {
    const sortedDrivers = groupByClassDrivers[driverClass].sort((a, b) => {
      if (!a.position && !b.position) {
        return b.irating - a.irating;
      }

      if (!a.position) {
        return 1;
      }

      if (!b.position) {
        return -1;
      }

      return a.position - b.position;
    });

    let benchmarkTime = 0;
    const sortedDriversWithGapTime = sortedDrivers.map((driver, index) => {
      // return {
      //   ...driver,
      //   // gapTime: Math.ceil((driver.estimatedLap - benchmarkTime) * 10) / 10,
      //   gapTime: Math.ceil(driver.estimatedLap * 10) / 10,
      // };
      if (index === 0) {
        if (!isRaceSes && driver.position) {
          benchmarkTime = driver.fastestLap;
        }
        return { ...driver, gapTime: 0 };
      }

      if (!isRaceSes) {
        if (!driver.position || !benchmarkTime) {
          return { ...driver, gapTime: 0 };
        }

        return {
          ...driver,
          gapTime: Math.ceil((driver.fastestLap - benchmarkTime) * 10) / 10,
        };
      }

      return {
        ...driver,
        gapTime: Math.ceil(driver.estimatedLap * 10) / 10,
      };
    });

    const filteredDriversWithValidTime = sortedDriversWithGapTime?.filter(
      (d) => d.fastestLap !== -1,
    );

    let classFastestDriver = null;
    if (filteredDriversWithValidTime.length > 0) {
      classFastestDriver = filteredDriversWithValidTime.reduce(
        (fastestDriver, currentDriver) => {
          return currentDriver.fastestLap < fastestDriver.fastestLap
            ? currentDriver
            : fastestDriver;
        },
      );
    }

    const userCar = sessionInfo.data.DriverInfo.Drivers.find(
      (d) => d.CarIdx === getUserCarIdx(sessionInfo),
    );

    sortedDriverClasses.push({
      drivers: sortedDriversWithGapTime,
      className: driverClass,
      classColor: sortedDriversWithGapTime[0].carClassColor,
      classRelativeSpeed: sortedDriversWithGapTime[0].classRelativeSpeed,
      classFastestCarIdx: classFastestDriver?.carIdx,
      isUserClass:
        userCar?.CarClassShortName === driverClass ||
        userCar?.CarScreenNameShort === driverClass,
    });
  });

  return {
    driverClasses: sortedDriverClasses.sort(
      (a, b) => b.classRelativeSpeed - a.classRelativeSpeed,
    ),
    userInfo: userDriver
      ? {
          ...userDriver,
          currentLap: telemetry.values.CarIdxLap[userCarIdx],
          gapTime: 0,
        }
      : undefined,
  };
};
