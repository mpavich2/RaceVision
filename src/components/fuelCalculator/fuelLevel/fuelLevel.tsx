import styles from './fuelLevel.module.css';

export function FuelLevel(props: { maxFuel?: number; curFuel?: number }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.fuelBarWrapper}>
        <progress
          className={styles.fuelBar}
          value={props.curFuel}
          max={props.maxFuel}
        />
      </div>
      <div className={styles.textWrapper}>
        <div>0</div>
        <div>{props.curFuel?.toFixed(1)}L</div>
        <div>{props.maxFuel?.toFixed(1)}L</div>
      </div>
    </div>
  );
}
