import { shortenIrating } from '../../../utils/iratingUtils';

export function StrengthOfField(props: { value: number }) {
  const strengthRating = shortenIrating(props.value);

  return <div style={{ fontWeight: 'bold' }}>SoF {strengthRating}</div>;
}
