import './carRpm.css';

export function CarRpm(props: { rpm: number }) {
  return (
    <div className="carRpm">
      <div>RPM</div>
      <div>{props.rpm}</div>
    </div>
  );
}
