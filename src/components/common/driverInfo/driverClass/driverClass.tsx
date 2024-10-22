import styles from './driverClass.module.css';

export function DriverClass(props: { classColorInfo: string }) {
  const hexColor = `#${props.classColorInfo}`;

  return (
    <div
      className={styles.carClass}
      style={{
        backgroundColor: hexColor,
      }}
    >
      0
    </div>
  );
}
