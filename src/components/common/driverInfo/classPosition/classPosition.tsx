import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import './classPosition.css';

export function ClassPosition(props: { position: number; isUser: boolean }) {
  return (
    <div
      className="classPositionWrapper"
      style={{
        backgroundColor: props.isUser
          ? COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_USER_COLOR
          : 'white',
      }}
    >
      {props.position || '-'}
    </div>
  );
}
