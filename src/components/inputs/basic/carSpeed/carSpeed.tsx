import { DisplayUnits } from '../../../../types/displayUnits';

export function CarSpeed(props: { speed: number; units: DisplayUnits }) {
  return (
    <div className="carSpeed">
      <div>{props.units}</div>
      <div>{props.speed}</div>
    </div>
  );
}
