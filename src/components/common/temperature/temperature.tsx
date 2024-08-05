export function Temperature(props: {
  temp: {
    value: number;
    units: string;
  };
}) {
  return (
    <div style={{ fontWeight: 'bold' }}>
      {props.temp.value}
      {props.temp.units}
    </div>
  );
}
