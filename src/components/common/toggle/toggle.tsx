/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './toggle.module.css';

export function ToggleSwitch(props: {
  isOn: boolean;
  handleToggle: () => void;
  headerText: string;
}) {
  return (
    <div>
      <div className={styles.toggleHeader}>{props.headerText}</div>
      <div className={styles.toggleWrapper}>
        <label
          className={`${styles.circleSlider} ${props.isOn ? `${styles.on}` : `${styles.off}`}`}
          onChange={props.handleToggle}
        >
          <input type="checkbox" checked={props.isOn} readOnly />
          <span
            className={`${styles.circle} ${props.isOn ? `${styles.on}` : `${styles.off}`}`}
          />
        </label>

        <div>{props.isOn ? 'On' : 'Off'}</div>
      </div>
    </div>
  );
}
