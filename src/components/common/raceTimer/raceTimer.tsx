import { formatTime, formatTimeWithSuffix } from '../../../utils/timeUtils';

export function RaceTimer(props: {
  currentTime: number;
  endTime: number;
  eventType: string;
}) {
  return (
    <div style={{ fontWeight: 'bold' }}>
      {props.eventType} {formatTime(props.currentTime)}/
      {formatTimeWithSuffix(props.endTime)}
    </div>
  );
}
