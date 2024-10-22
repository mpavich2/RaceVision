import styles from './carRpm.module.css';

export function CarRpm(props: { rpm: number }) {
  const roundedRpm = Math.round(props.rpm);

  return (
    <div className={styles.carRpm}>
      <div>RPM</div>
      <div>{roundedRpm}</div>
    </div>
  );
}
