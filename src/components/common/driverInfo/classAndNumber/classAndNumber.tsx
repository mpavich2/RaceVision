import { darkenHexColor } from '../../../../utils/colorUtilts';
import styles from './classAndNumber.module.css';

export function ClassAndNumber(props: {
  carNumber: string;
  classColorInfo: string;
}) {
  const hexColor = `#${props.classColorInfo}`;
  const darkenedHexColor = darkenHexColor(`#${props.classColorInfo}`, -90);
  return (
    <div
      className={styles.carClassAndNumberWrapper}
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
