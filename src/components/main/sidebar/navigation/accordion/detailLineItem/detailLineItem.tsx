import './detailLineItem.css';

export function AccordionDetailLineItem(props: {
  isActive: boolean;
  onClick: (index: number) => void;
  index: number;
  title: string;
}) {
  return (
    <button
      className={`overlayLineItem ${props.isActive ? 'active' : ''}`}
      type="button"
      onClick={() => props.onClick(props.index)}
    >
      {props.title}
    </button>
  );
}
