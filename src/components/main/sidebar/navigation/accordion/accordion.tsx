/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from '../../shared.module.css';

export function Accordion(props: {
  isActive: boolean;
  onClick: (index: number) => void;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className={`${styles.sidebarButton} ${props.isActive ? `${styles.active}` : ''} ${styles.accordion}`}
      onClick={() => props.onClick(props.index)}
    >
      {props.children}
    </div>
  );
}
