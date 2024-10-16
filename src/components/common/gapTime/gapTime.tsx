import './gapTime.css';

export function GapTime(props: { time: number; isUser?: boolean }) {
  const formattedTime = props.time.toFixed(1);

  return (
    <div className={props.isUser ? 'userColor' : ''}>
      {props.time > 0 ? formattedTime : '-'}
    </div>
  );
}
