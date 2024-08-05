export function RaceTimer(props: { currentTime: string; endTime: string }) {
  return (
    <div style={{ fontWeight: 'bold' }}>
      Race {props.currentTime}/{props.endTime}
    </div>
  );
}
