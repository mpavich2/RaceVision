import * as BrakeBiasIcon from '../../../icons/brake2.svg';
import styles from './brakeBias.module.css';

export function BrakeBias(props: { bias: number }) {
  return (
    <div className={styles.wrapper}>
      <BrakeBiasIcon.ReactComponent height="2rem" width="2rem" fill="white" />
      <p>{props.bias.toFixed(2)}%</p>
    </div>
  );
}
