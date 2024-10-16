import { IDriverClasses } from '../../../types/standings';
import { ClassName } from '../../common/className';
import { StandingsTableRow } from './row';
import './table.css';

const MAX_DRIVERS_SHOWN_OUTSIDE_CLASS = 3;

export function StandingsTable(props: {
  driverByClassData: IDriverClasses[];
  userCarIdx: number;
  userCurrentLap: number;
  userCarClass: string;
  userPosition: number;
}) {
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
    const startIndex = userPositionIndex - MAX_DRIVERS_SHOWN_OUTSIDE_CLASS;
    const endIndex =
      userPositionIndex +
      MAX_DRIVERS_SHOWN_OUTSIDE_CLASS +
      (!props.userPosition ? 1 : 0);

    const userClassPeers = driverClass.drivers.slice(
      startIndex >= 0 ? startIndex : 0,
      endIndex <= driverClass.drivers.length
        ? endIndex
        : driverClass.drivers.length,
    );
    const userClassLeaders = driverClass.drivers.slice(
      0,
      MAX_DRIVERS_SHOWN_OUTSIDE_CLASS,
    );

    return {
      ...driverClass,
      drivers: userClassLeaders.concat(userClassPeers),
    };
  });

  return (
    <div className="standingsTableWrapper">
      {reducedDriverData.map((driverClass) => {
        return (
          <div className="driverClassTable" key={driverClass.className}>
            <ClassName
              className={driverClass.className}
              classColor={`#${driverClass.classColor}`}
            />
            <table>
              <tbody>
                {driverClass.drivers.map((d) => {
                  return (
                    <StandingsTableRow
                      key={d.carNumber}
                      driverData={d}
                      userData={{
                        userCarIdx: props.userCarIdx,
                        userCurrentLap: props.userCurrentLap,
                      }}
                      classFastestCarIdx={driverClass.classFastestCarIdx}
                    />
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
