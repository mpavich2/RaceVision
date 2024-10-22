import styles from './gapTime.module.css';

export function GapTime(props: { time: number; isUser?: boolean }) {
  const formattedTime = props.time.toFixed(1);

  return (
    <div className={props.isUser ? styles.userColor : ''}>
      {props.time > 0 ? formattedTime : '-'}
    </div>
  );
}
