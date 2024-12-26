import { GiFullMotorcycleHelmet } from 'react-icons/gi';
import styles from './driverCount.module.css';

export function DriverCount(props: { count: number; classColor?: string }) {
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: props.classColor,
        color: props.classColor && 'black',
      }}
    >
      <GiFullMotorcycleHelmet /> {props.count}
    </div>
  );
}
