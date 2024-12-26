import { ISessionInfo, ITelemetry } from '../../../types/iracing';
import { IDriverClasses } from '../../../types/standings';
import { ClassName } from '../../common/className';
import { DriverCount } from '../../common/driverCount';
import { StandingsHeader } from '../header';
import { StandingsTableRow } from './row';
import styles from './table.module.css';

const MAX_DRIVERS_SHOWN_OUTSIDE_CLASS = 3;
const MAX_PEER_DRIVERS_FRONT = 1;
const MAX_PEER_DRIVERS_REAR = 3;

export function StandingsTable(props: {
  driverByClassData: IDriverClasses[];
  userCarIdx: number;
  userCurrentLap: number;
  userCarClass: string;
  userPosition: number;
  sessionInfo?: ISessionInfo;
  telemetry?: ITelemetry;
}) {
  const getUserPosition = () => {
    const userIndex = props.driverByClassData
      .find((driverClass) => driverClass.isUserClass)
      ?.drivers.findIndex((d) => d.carIdx === props.userCarIdx);

    if (!userIndex) {
      return 0;
    }

    const userPositionIndex = props.userPosition
      ? props.userPosition
      : userIndex + 1;

    return userPositionIndex;
  };

  const reducedDriverData = props.driverByClassData.map((driverClass) => {
    if (driverClass.className !== props.userCarClass) {
      return {
        ...driverClass,
        drivers: driverClass.drivers.slice(0, MAX_DRIVERS_SHOWN_OUTSIDE_CLASS),
      };
    }

    if (driverClass.drivers.length < 8) {
      return driverClass;
    }

    const userIndex = driverClass.drivers.findIndex(
      (d) => d.carIdx === props.userCarIdx,
    );

    if (userIndex <= 6) {
      return {
        ...driverClass,
        drivers: driverClass.drivers.slice(0, 7),
      };
    }

    const userClassLeaders = driverClass.drivers.slice(
      0,
      MAX_DRIVERS_SHOWN_OUTSIDE_CLASS,
    );

    const driversWithoutLeaders = driverClass.drivers.filter(
      (d) => !userClassLeaders.includes(d),
    );
    const filteredUserIndex = driversWithoutLeaders.findIndex(
      (d) => d.carIdx === props.userCarIdx,
    );
    const endIndex = filteredUserIndex + MAX_PEER_DRIVERS_REAR;

    const startIndex = filteredUserIndex - MAX_PEER_DRIVERS_FRONT;
    const adjustedStartIndex =
      endIndex > driversWithoutLeaders.length
        ? startIndex - (endIndex - driversWithoutLeaders.length)
        : startIndex;

    const userClassPeers = driversWithoutLeaders.slice(
      adjustedStartIndex,
      endIndex,
    );

    return {
      ...driverClass,
      drivers: userClassLeaders.concat(userClassPeers),
    };
  });

  // TODO: insert psuedo rows with fixed height to simulate anticipated size correctly instead of 100% height
  return (
    <div
      className={styles.standingsTableWrapper}
      style={{
        height: props.driverByClassData.length === 0 ? '100%' : '',
      }}
    >
      <StandingsHeader
        sessionInfo={props.sessionInfo}
        telemetry={props.telemetry}
        driverData={props.driverByClassData}
      />
      {reducedDriverData.map((driverClass) => {
        return (
          <div className={styles.driverClassTable} key={driverClass.className}>
            <div
              className={styles.driverTableHeader}
              style={{
                borderBottom: `0.1rem solid #${driverClass.classColor}`,
              }}
            >
              <ClassName
                className={driverClass.className}
                classColor={`#${driverClass.classColor}`}
              />
              <DriverCount
                count={
                  props.driverByClassData.find(
                    (d) => d.className === driverClass.className,
                  )?.drivers.length || 0
                }
                classColor={`#${driverClass.classColor}`}
              />
            </div>
            <table>
              <tbody>
                {driverClass.drivers.map((d, index) => {
                  return (
                    <>
                      <StandingsTableRow
                        key={d.carNumber}
                        driverData={d}
                        userData={{
                          userCarIdx: props.userCarIdx,
                          userCurrentLap: props.userCurrentLap,
                        }}
                        classFastestCarIdx={driverClass.classFastestCarIdx}
                      />

                      {index === 2 &&
                        getUserPosition() > 7 &&
                        driverClass.className === props.userCarClass && (
                          <tr className={styles.gapRow}>
                            <td colSpan={2} />
                          </tr>
                        )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
