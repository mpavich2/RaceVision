import { getSessionType } from '../../../services/iracingMappingUtils';
import { ITelemetry, ISessionInfo } from '../../../types/iracing';
import { IDriverClasses } from '../../../types/standings';
import { DriverCount } from '../../common/driverCount';
import { RaceTimer } from '../../common/raceTimer';
import styles from './header.module.css';

export function StandingsHeader(props: {
  telemetry?: ITelemetry;
  sessionInfo?: ISessionInfo;
  driverData?: IDriverClasses[];
}) {
  const sessionType =
    props.sessionInfo && props.telemetry
      ? getSessionType(props.sessionInfo, props.telemetry.values.SessionNum)
      : 'Practice';
  const currentTime = props.telemetry?.values.SessionTime || 0;
  const endTime = props.telemetry?.values.SessionTimeTotal || 0;

  return (
    <div className={styles.wrapper}>
      <RaceTimer
        eventType={sessionType}
        currentTime={currentTime}
        endTime={endTime}
      />

      <DriverCount
        count={
          props.driverData?.reduce((sum, cur) => sum + cur.drivers.length, 0) ||
          0
        }
      />
    </div>
  );
}
