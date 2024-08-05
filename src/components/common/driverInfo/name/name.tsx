import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import { determineDriverRelativeColor } from '../../../../services/determineDriverColors';

export function DriverName(props: {
  driverName: string;
  lapInfo?: {
    userLap: number;
    driverLap: number;
    relativeTime: number;
    driverInPit: boolean;
  };
  isUser?: boolean;
}) {
  const color = (() => {
    if (props.isUser) {
      return COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_USER_COLOR;
    }

    if (props.lapInfo) {
      if (props.lapInfo.driverInPit) {
        return COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_IN_PIT_COLOR;
      }

      return determineDriverRelativeColor(
        props.lapInfo.userLap,
        props.lapInfo.driverLap,
        props.lapInfo.relativeTime,
      );
    }

    return COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_SAME_LAP_AS_USER_COLOR;
  })();

  return (
    <div
      style={{
        color,
        fontWeight: 'bold',
      }}
    >
      {props.driverName}
    </div>
  );
}
