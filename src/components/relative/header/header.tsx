import { Temperature } from '../../common/temperature';
import { IncidentCounter } from '../../common/driverInfo/incidentCounter';
import styles from './header.module.css';
import { ISessionInfo, ITelemetry } from '../../../types/iracing';
import { StrengthOfField } from '../../common/strengthOfField';

export function RelativeHeader(props: {
  telemetry?: ITelemetry;
  sessionInfo?: ISessionInfo;
  strengthOfField: number;
}) {
  const temperature =
    props.sessionInfo?.data.WeekendInfo.TrackSurfaceTemp || '0';
  const incidentInfo = {
    maxIncidents:
      props.sessionInfo?.data.WeekendInfo.WeekendOptions.IncidentLimit || '0',
    currentTotalIncidents:
      props.telemetry?.values.PlayerCarMyIncidentCount || 0,
  };

  return (
    <div className={styles.relativeHeader}>
      <Temperature temp={temperature} />
      {props.strengthOfField ? (
        <StrengthOfField value={props.strengthOfField} />
      ) : null}
      <IncidentCounter
        maxIncidents={incidentInfo.maxIncidents}
        currentTotalIncidents={incidentInfo.currentTotalIncidents}
      />
    </div>
  );
}
