import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import './classAndNumber.css';

export function ClassAndNumber(props: {
  carNumber: string;
  classColorInfo: {
    HIGHLIGHT: string;
    DEFAULT: string;
  };
  isUser?: boolean;
}) {
  return (
    <div
      className="carClassAndNumberWrapper"
      style={{
        backgroundColor: props.classColorInfo?.DEFAULT,
        color: props.isUser
          ? COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_USER_COLOR
          : '',
        borderLeft: `0.5rem solid ${props.classColorInfo?.HIGHLIGHT}`,
      }}
    >
      #{props.carNumber}
    </div>
  );
}
