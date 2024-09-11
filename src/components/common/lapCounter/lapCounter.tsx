export function LapCounter(props: { totalLaps: number; currentLap: number }) {
  const lap = props.currentLap === -1 ? 0 : props.currentLap;

  return (
    <div style={{ fontWeight: 'bold' }}>
      Laps {lap}/~{props.totalLaps}
    </div>
  );
}
