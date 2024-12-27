import styles from './detailLineItem.module.css';

export function AccordionDetailLineItem(props: {
  isActive: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      className={`${styles.overlayLineItem} ${props.isActive ? `${styles.active}` : ''}`}
      type="button"
      onClick={() => props.onClick()}
    >
      {props.title}
    </button>
  );
}
