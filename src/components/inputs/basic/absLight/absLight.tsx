import * as AbsIcon from '../../../../icons/abs-light-icon.svg';

export function AbsLight(props: { isAbsActive: boolean }) {
  const absColor = () => {
    return props.isAbsActive ? '#E90600' : '#ffffff';
  };

  return (
    <AbsIcon.ReactComponent height="5rem" width="5rem" fill={absColor()} />
  );
}
