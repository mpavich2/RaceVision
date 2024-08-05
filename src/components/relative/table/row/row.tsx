import { ClassAndNumber } from '../../../common/driverInfo/classAndNumber';
import { ClassPosition } from '../../../common/driverInfo/classPosition';
import { Irating } from '../../../common/driverInfo/irating';
import { LicenseClass } from '../../../common/driverInfo/license';
import { DriverName } from '../../../common/driverInfo/name';
import { DriverTime } from '../../../common/driverInfo/time/time';
import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import './row.css';
import { IRelativeDriverData } from '../../../../types/relative';

export function RelativeTableRow(props: {
  driverData: IRelativeDriverData;
  userData: {
    userCarIdx: number;
    userCurrentLap: number;
  };
  classColorInfo: {
    HIGHLIGHT: string;
    DEFAULT: string;
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
      <td className="classAndNumber">
        <ClassAndNumber
          carNumber={props.driverData.carNumber}
          classColorInfo={props.classColorInfo}
          isUser={isUser}
        />
      </td>
      <td className="relativeName">
        <DriverName
          driverName={props.driverData.driverName}
          lapInfo={lapInfo}
          isUser={isUser}
        />
      </td>
      <td className="licenseClass">
        <LicenseClass
          licenseSafetyRatingCombined={
            props.driverData.licenseSafetyRatingCombined
          }
        />
      </td>
      <td className="irating">
        <Irating
          irating={props.driverData.irating}
          iratingDiff={props.driverData.iratingDiff}
        />
      </td>
      <td>
        <DriverTime
          time={props.driverData.relativeTime}
          lapInfo={lapInfo}
          isUser={isUser}
        />
      </td>
    </tr>
  );
}
