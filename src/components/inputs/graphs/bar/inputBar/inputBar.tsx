import { InputType } from '../../../../../types/inputType';
import styles from './inputBar.module.css';

const colors = {
  [InputType.THROTTLE]: '#0AB71B',
  [InputType.BRAKE]: '#E90600',
  [InputType.CLUTCH]: '#3B5DC0',
};

export function InputBar(props: { value: number; inputType: InputType }) {
  const roundedValue = Math.round(props.value);

  return (
    <div className={styles.inputBar}>
      <div>{roundedValue}</div>
      <div className={styles.inputProgressWrapper}>
        <div
          className={styles.progressBar}
          style={{
            backgroundColor: colors[props.inputType],
            height: `${roundedValue}%`,
          }}
        />
      </div>
    </div>
  );
}
