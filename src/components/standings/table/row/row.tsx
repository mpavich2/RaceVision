import { ClassPosition } from '../../../common/driverInfo/classPosition';
import { DriverName } from '../../../common/driverInfo/name';
import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import './row.css';
import { IStandingsDriverData } from '../../../../types/standings';
import { Irating } from '../../../common/driverInfo/irating';
import { LapTime } from '../../../common/lapTime';
import { GapTime } from '../../../common/gapTime';

export function StandingsTableRow(props: {
  driverData: IStandingsDriverData;
  userData: {
    userCarIdx: number;
    userCurrentLap: number;
  };
  classFastestCarIdx: number;
}) {
  const isUser = props.driverData.carIdx === props.userData.userCarIdx;

  return (
    <tr
      id={props.driverData.carIdx.toString()}
      className={
        props.driverData.isDriverOffTrack ? 'offTrackBackgroundRadius' : ''
      }
      style={{
        backgroundColor: props.driverData.isDriverOffTrack
          ? COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_OFF_TRACK
          : '',
      }}
    >
      <td className="classPosition">
        <ClassPosition position={props.driverData.position} isUser={isUser} />
      </td>
      <td className="driverName">
        <DriverName
          driverName={props.driverData.driverName}
          isUser={isUser}
          lapInfo={{ driverInPit: props.driverData.isDriverInPit }}
        />
      </td>
      <td className="irating">
        <Irating irating={props.driverData.irating} />
      </td>
      <td className="gap">
        <GapTime isUser={isUser} time={props.driverData.gapTime} />
      </td>
      <td className="fastestLap">
        <LapTime
          isUser={isUser}
          time={props.driverData.fastestLap}
          isFastestLap={props.driverData.carIdx === props.classFastestCarIdx}
        />
      </td>
      <td className="lastLap">
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
