import { DisplayUnits } from '../../../../types/displayUnits';
import styles from './carSpeed.module.css';

export function CarSpeed(props: { speed: number; units: DisplayUnits }) {
  const roundedSpeed = Math.round(props.speed);

  return (
    <div className={styles.carSpeed}>
      <div>{props.units}</div>
      <div>{roundedSpeed}</div>
    </div>
  );
}
