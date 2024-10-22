import styles from './light.module.css';

export function ShiftingLight(props: {
  isWarningLight: boolean;
  isBlinking: boolean;
  isActive: boolean;
}) {
  const calculateLightColor = () => {
    if (props.isBlinking) {
      return '#3B5DC0';
    }

    if (props.isWarningLight && props.isActive) {
      return '#FFFF00';
    }

    if (props.isActive) {
      return '#0AB71B';
    }

    return '#3b3b3b';
  };
  return (
    <div
      className={styles.shiftLight}
      style={{ backgroundColor: calculateLightColor() }}
    />
  );
}
