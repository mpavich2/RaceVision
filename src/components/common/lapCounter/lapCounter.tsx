export function LapCounter(props: {
  totalLaps: number;
  currentLap: number;
  isEstimate: boolean;
}) {
  const lap = props.currentLap === -1 ? 0 : props.currentLap;

  return (
    <div style={{ fontWeight: 'bold' }}>
      Laps {lap}/{props.isEstimate && '~'}
      {props.totalLaps}
    </div>
  );
}
