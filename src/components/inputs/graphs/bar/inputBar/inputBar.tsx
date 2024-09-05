import { InputType } from '../../../../../types/inputType';
import './inputBar.css';

const colors = {
  [InputType.THROTTLE]: '#0AB71B',
  [InputType.BRAKE]: '#E90600',
  [InputType.CLUTCH]: '#3B5DC0',
};

export function InputBar(props: { value: number; inputType: InputType }) {
  const roundedValue = Math.round(props.value);

  return (
    <div className="inputBar">
      <div>{roundedValue}</div>
      <div className="inputProgressWrapper">
        <div
          className="progressBar"
          style={{
            backgroundColor: colors[props.inputType],
            height: `${roundedValue}%`,
          }}
        />
      </div>
    </div>
  );
}
