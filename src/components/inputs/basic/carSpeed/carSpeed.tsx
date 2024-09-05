import { DisplayUnits } from '../../../../types/displayUnits';

export function CarSpeed(props: { speed: number; units: DisplayUnits }) {
  const roundedSpeed = Math.round(props.speed);

  return (
    <div className="carSpeed">
      <div>{props.units}</div>
      <div>{roundedSpeed}</div>
    </div>
  );
}
