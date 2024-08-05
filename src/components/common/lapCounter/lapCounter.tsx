export function LapCounter(props: { totalLaps: number; currentLap: number }) {
  return (
    <div style={{ fontWeight: 'bold' }}>
      Lap {props.currentLap}/{props.totalLaps}
    </div>
  );
}
