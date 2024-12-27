import { ClassAndNumber } from '../../../common/driverInfo/classAndNumber';
import { ClassPosition } from '../../../common/driverInfo/classPosition';
import { Irating } from '../../../common/driverInfo/irating';
import { LicenseClass } from '../../../common/driverInfo/license';
import { DriverName } from '../../../common/driverInfo/name';
import { DriverTime } from '../../../common/driverInfo/time/time';
import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import styles from './row.module.css';
import { IRelativeDriverData } from '../../../../types/relative';

export function RelativeTableRow(props: {
  driverData: IRelativeDriverData;
  userData: {
    userCarIdx: number;
    userCurrentLap: number;
  };
  sessionData: {
    isRaceSession: boolean;
  };
}) {
  const isUser = props.driverData.carIdx === props.userData.userCarIdx;
  const lapInfo = {
    userLap: props.userData.userCurrentLap,
    driverLap: props.driverData.currentLap,
    relativeTime: props.driverData.relativeTime,
    driverInPit: props.driverData.isInPit,
  };

  return (
    <tr
      id={props.driverData.carIdx.toString()}
      className={
        props.driverData.isDriverOffTrack
          ? `${styles.offTrackBackgroundRadius}`
          : ''
      }
      style={{
        backgroundColor: props.driverData.isDriverOffTrack
          ? COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_OFF_TRACK
          : '',
      }}
    >
      <td className={styles.classPosition}>
        <ClassPosition position={props.driverData.position} isUser={isUser} />
      </td>
      <td className={styles.classAndNumber}>
        <ClassAndNumber
          carNumber={props.driverData.carNumber}
          classColorInfo={props.driverData.carClassColor}
        />
      </td>
      <td className={styles.relativeName}>
        <DriverName
          driverName={props.driverData.driverName}
          lapInfo={lapInfo}
          isUser={isUser}
          isRaceSession={props.sessionData.isRaceSession}
        />
      </td>
      <td className={styles.licenseClass}>
        <LicenseClass
          licenseSafetyRatingCombined={
            props.driverData.licenseSafetyRatingCombined
          }
        />
      </td>
      <td className={styles.irating}>
        <Irating
          irating={props.driverData.irating}
          iratingDiff={props.driverData.iratingDiff}
          hideIratingDiff={!props.sessionData.isRaceSession}
        />
      </td>

      <td>
        <DriverTime
          time={props.driverData.relativeTime}
          lapInfo={lapInfo}
          isUser={isUser}
          isRaceSession={props.sessionData.isRaceSession}
        />
      </td>
    </tr>
  );
}
