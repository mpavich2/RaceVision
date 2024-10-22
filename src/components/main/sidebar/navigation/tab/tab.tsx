/* eslint-disable no-undef */
import styles from '../../shared.module.css';

export function Tab(props: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: (index: number) => void;
  index: number;
}) {
  return (
    <button
      className={`${styles.sidebarButton} ${props.isActive ? `${styles.active}` : ''}`}
      onClick={() => props.onClick(props.index)}
      type="button"
    >
      {props.children}
    </button>
  );
}
