import './className.css';

export function ClassName(props: { className: string; classColor: string }) {
  return (
    <div
      style={{
        backgroundColor: props.classColor || 'white',
      }}
      className="carClassName"
    >
      {props.className}
    </div>
  );
}
