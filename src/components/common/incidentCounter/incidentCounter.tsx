export function IncidentCounter(props: {
  maxIncidents: number;
  currentTotalIncidents: number;
}) {
  return (
    <div style={{ fontWeight: 'bold' }}>
      {props.currentTotalIncidents}/{props.maxIncidents}x
    </div>
  );
}
