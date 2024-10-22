import styles from './carGear.module.css';

export function CarGear(props: { gear: number }) {
  const calculateGear = () => {
    if (props.gear === -1) {
      return 'R';
    }

    if (props.gear === 0) {
      return 'N';
    }

    return props.gear;
  };

  return <div className={styles.carGear}>{calculateGear()}</div>;
}
