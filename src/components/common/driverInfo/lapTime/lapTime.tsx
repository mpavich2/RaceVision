import { formatLapTime } from '../../../../utils/timeUtils';
import styles from './lapTime.module.css';

export function LapTime(props: {
  time?: number;
  isUser?: boolean;
  isFastestLap?: boolean;
  isDriverSessionFastestLap?: boolean;
}) {
  const defaultTime = '--:--.---';
  const isTimeSet = props.time && props.time > 0;

  const getLapTimeColor = () => {
    if (!isTimeSet && !props.isUser) {
      return '';
    }

    if (props.isFastestLap && isTimeSet) {
      return styles.fastestLapColor;
    }

    if (props.isDriverSessionFastestLap && isTimeSet) {
      return styles.driverSessionBestColor;
    }

    if (props.isUser) {
      return styles.userColor;
    }

    return '';
  };

  return (
    <div className={getLapTimeColor()}>
      {props.time && props.time > 0 ? formatLapTime(props.time) : defaultTime}
    </div>
  );
}
