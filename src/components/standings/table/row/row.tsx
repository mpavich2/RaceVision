import { ClassPosition } from '../../../common/driverInfo/classPosition';
import { DriverName } from '../../../common/driverInfo/name';
import styles from './row.module.css';
import { IStandingsDriverData } from '../../../../types/standings';
import { Irating } from '../../../common/driverInfo/irating';
import { LapTime } from '../../../common/driverInfo/lapTime';
import { GapTime } from '../../../common/driverInfo/gapTime';
import { DriverClass } from '../../../common/driverInfo/driverClass';

export function StandingsTableRow(props: {
  driverData: IStandingsDriverData;
  userData: {
    userCarIdx: number;
    userCurrentLap: number;
  };
  classFastestCarIdx?: number;
}) {
  const isUser = props.driverData.carIdx === props.userData.userCarIdx;

  return (
    <tr id={props.driverData.carIdx.toString()}>
      <td className={styles.classPosition}>
        <ClassPosition position={props.driverData.position} isUser={isUser} />
      </td>
      <td className={styles.classColor}>
        <DriverClass classColorInfo={props.driverData.carClassColor} />
      </td>
      <td className={styles.driverName}>
        <DriverName
          driverName={props.driverData.driverName}
          isUser={isUser}
          lapInfo={{ driverInPit: props.driverData.isDriverInPit }}
        />
      </td>
      <td className={styles.irating}>
        <Irating irating={props.driverData.irating} hideIratingDiff />
      </td>
      <td className={styles.gap}>
        <GapTime isUser={isUser} time={props.driverData.gapTime} />
      </td>
      <td className={styles.fastestLap}>
        <LapTime
          isUser={isUser}
          time={props.driverData.fastestLap}
          isFastestLap={props.driverData.carIdx === props.classFastestCarIdx}
        />
      </td>
      <td className={styles.lastLap}>
        <LapTime
          time={props.driverData.lastLap}
          isUser={isUser}
          isFastestLap={
            props.driverData.carIdx === props.classFastestCarIdx &&
            props.driverData.fastestLap === props.driverData.lastLap
          }
          isDriverSessionFastestLap={
            props.driverData.fastestLap === props.driverData.lastLap
          }
        />
      </td>
    </tr>
  );
}
