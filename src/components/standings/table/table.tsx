import { useState } from 'react';
import { IDriverClasses } from '../../../types/standings';
import { ClassName } from '../../common/className';
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
}) {
  const [isGapRow, setIsGapRow] = useState<boolean>(true);

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
    const userPositionIndex = props.userPosition
      ? props.userPosition - 1
      : userIndex;

    if (userIndex <= 6) {
      setIsGapRow(false);
      return {
        ...driverClass,
        drivers: driverClass.drivers.slice(0, 6),
      };
    }

    const userClassPeers = driverClass.drivers.slice(
      userPositionIndex - MAX_PEER_DRIVERS_FRONT,
      userPositionIndex + MAX_PEER_DRIVERS_REAR,
    );

    const userClassLeaders = driverClass.drivers.slice(
      0,
      MAX_DRIVERS_SHOWN_OUTSIDE_CLASS,
    );

    const uniqueDrivers = [
      ...new Map(
        [...userClassLeaders, ...userClassPeers].map((item) => [
          item.carIdx,
          item,
        ]),
      ).values(),
    ];

    return {
      ...driverClass,
      drivers: uniqueDrivers,
    };
  });

  return (
    <div className={styles.standingsTableWrapper}>
      {reducedDriverData.map((driverClass) => {
        return (
          <div className={styles.driverClassTable} key={driverClass.className}>
            <ClassName
              className={driverClass.className}
              classColor={`#${driverClass.classColor}`}
            />
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
                        isGapRow &&
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
