import './driverClass.css';

export function DriverClass(props: { classColorInfo: string }) {
  const hexColor = `#${props.classColorInfo}`;

  return (
    <div
      className="carClass"
      style={{
        backgroundColor: hexColor,
      }}
    >
      0
    </div>
  );
}
