import { getRelativeTimeColor } from '../../../../services/determineDriverColors';

export function DriverTime(props: {
  time: number;
  lapInfo?: {
    userLap: number;
    driverLap: number;
    relativeTime: number;
    driverInPit: boolean;
  };
  isUser?: boolean;
  isRaceSession?: boolean;
}) {
  const color = getRelativeTimeColor(
    props.isUser || false,
    props.isRaceSession || false,
    props.lapInfo,
  );

  return (
    <div
      style={{
        color,
      }}
    >
      {props.time.toFixed(1)}
    </div>
  );
}
