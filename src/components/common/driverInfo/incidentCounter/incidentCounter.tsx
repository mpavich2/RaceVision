export function IncidentCounter(props: {
  maxIncidents: string;
  currentTotalIncidents: number;
}) {
  const isIncidentsUnlimited = props.maxIncidents === 'unlimited';

  return (
    <div style={{ fontWeight: 'bold' }}>
      {isIncidentsUnlimited
        ? `${props.currentTotalIncidents}x`
        : `${props.currentTotalIncidents}/${props.maxIncidents}x`}
    </div>
  );
}
