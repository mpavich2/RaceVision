import { getDriverNameColor } from '../../../../services/determineDriverColors';

export function DriverName(props: {
  driverName: string;
  lapInfo?: {
    userLap?: number;
    driverLap?: number;
    relativeTime?: number;
    driverInPit?: boolean;
  };
  isUser?: boolean;
  isRaceSession?: boolean;
}) {
  const color = getDriverNameColor(
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
      {props.driverName}
    </div>
  );
}
