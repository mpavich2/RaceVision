import { ReactNode } from 'react';
import styles from './customization.module.css';

export function CustomizationSettings(props: { children: ReactNode }) {
  return (
    <>
      <h3>Overlay Customization</h3>
      <div className={styles.wrapper}>{props.children}</div>
    </>
  );
}
