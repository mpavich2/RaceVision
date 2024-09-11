import { ISessionInfo, ITelemetry } from '../../../types/iracing';
import { LapCounter } from '../../common/lapCounter';
import { RaceTimer } from '../../common/raceTimer';
import './footer.css';

export function RelativeFooter(props: {
  userCurrentLap: number;
  telemetry?: ITelemetry;
  sessionInfo?: ISessionInfo;
}) {
  const totalLaps =
    props.telemetry && props.sessionInfo
      ? props.telemetry.values.SessionTimeTotal /
        props.sessionInfo.data.DriverInfo.DriverCarEstLapTime
      : 0;
  const roundedTotalLaps = parseFloat(totalLaps.toFixed(1));

  const currentTime = props.telemetry?.values.SessionTime || 0;
  const endTime = props.telemetry?.values.SessionTimeTotal || 0;

  return (
    <div className="relativeFooter">
      <LapCounter
        currentLap={props.userCurrentLap}
        totalLaps={roundedTotalLaps}
      />
      <RaceTimer
        eventType={props.sessionInfo?.data.WeekendInfo.EventType || 'Practice'}
        currentTime={currentTime}
        endTime={endTime}
      />
    </div>
  );
}
