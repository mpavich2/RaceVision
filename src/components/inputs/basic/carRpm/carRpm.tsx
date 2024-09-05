import './carRpm.css';

export function CarRpm(props: { rpm: number }) {
  const roundedRpm = Math.round(props.rpm);

  return (
    <div className="carRpm">
      <div>RPM</div>
      <div>{roundedRpm}</div>
    </div>
  );
}
