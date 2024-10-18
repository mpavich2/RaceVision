/* eslint-disable no-undef */
import '../../shared.css';

export function Tab(props: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: (index: number) => void;
  index: number;
}) {
  return (
    <button
      className={`sidebarButton ${props.isActive ? 'active' : ''}`}
      onClick={() => props.onClick(props.index)}
      type="button"
    >
      {props.children}
    </button>
  );
}
