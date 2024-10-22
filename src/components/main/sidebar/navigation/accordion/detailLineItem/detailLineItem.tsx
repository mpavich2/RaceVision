import styles from './detailLineItem.module.css';

export function AccordionDetailLineItem(props: {
  isActive: boolean;
  onClick: (index: number) => void;
  index: number;
  title: string;
}) {
  return (
    <button
      className={`${styles.overlayLineItem} ${props.isActive ? `${styles.active}` : ''}`}
      type="button"
      onClick={() => props.onClick(props.index)}
    >
      {props.title}
    </button>
  );
}
