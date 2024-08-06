import { darkenHexColor } from '../../../../utils/colorUtilts';
import './classAndNumber.css';

export function ClassAndNumber(props: {
  carNumber: string;
  classColorInfo: string;
}) {
  const hexColor = `#${props.classColorInfo}`;
  const darkenedHexColor = darkenHexColor(`#${props.classColorInfo}`, -90);
  return (
    <div
      className="carClassAndNumberWrapper"
      style={{
        backgroundColor: darkenedHexColor,
        color: 'black',
        borderLeft: `0.5rem solid ${hexColor}`,
      }}
    >
      #{props.carNumber}
    </div>
  );
}
