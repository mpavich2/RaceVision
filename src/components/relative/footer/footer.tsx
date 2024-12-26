import { getCurrentSession } from '../../../services/iracingMappingUtils';
import { ISessionInfo, ITelemetry } from '../../../types/iracing';
import { BrakeBias } from '../../common/brakeBias';
import { LapCounter } from '../../common/lapCounter';
import styles from './footer.module.css';

export function RelativeFooter(props: {
  userCurrentLap: number;
  telemetry?: ITelemetry;
  sessionInfo?: ISessionInfo;
}) {
  const getTotalsLaps = () => {
    if (!props.sessionInfo || !props.telemetry) {
      return {
        isEstimate: false,
        laps: 0,
      };
    }

    const currentSession = getCurrentSession(
      props.sessionInfo,
      props.telemetry.values.SessionNum,
    );
    if (currentSession?.SessionLaps !== 'unlimited') {
      return {
        isEstimate: false,
        laps: parseInt(currentSession?.SessionLaps || '0', 10),
      };
    }

    const estimatedLaps =
      props.telemetry.values.SessionTimeTotal /
      props.sessionInfo.data.DriverInfo.DriverCarEstLapTime;
    return {
      isEstimate: true,
      laps: parseFloat(estimatedLaps.toFixed(1)),
    };
  };

  const lapInfo = getTotalsLaps();

  return (
    <div className={styles.relativeFooter}>
      <LapCounter
        currentLap={props.userCurrentLap}
        totalLaps={lapInfo.laps}
        isEstimate={lapInfo.isEstimate}
      />
      <BrakeBias bias={props.telemetry?.values.dcBrakeBias ?? 0} />
    </div>
  );
}
