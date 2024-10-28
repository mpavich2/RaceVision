import { DisplayUnits } from '../../../../types/displayUnits';
import styles from './carSpeed.module.css';

export function CarSpeed(props: { speed: number; units: DisplayUnits }) {
  const convertSpeed = () => {
    if (props.units === DisplayUnits.MPH) {
      return props.speed * 2.23694;
    }

    return props.speed * 3.6;
  };

  const roundedSpeed = Math.round(convertSpeed());

  return (
    <div className={styles.carSpeed}>
      <div>{props.units}</div>
      <div>{roundedSpeed}</div>
    </div>
  );
}
