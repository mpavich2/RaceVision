import { OpenOverlayButton } from '../../buttons/openOverlay';
import { ResetOverlayPositionButton } from '../../buttons/resetOverlay';
import styles from './header.module.css';

export function MainHeader(props: { text: string; windowName?: string }) {
  return (
    <div className={styles.container}>
      <h1>{props.text}</h1>
      {props.windowName && (
        <div className={styles.buttonContainer}>
          <OpenOverlayButton windowName={props.windowName} />
          <ResetOverlayPositionButton windowName={props.windowName} />
        </div>
      )}
    </div>
  );
}
