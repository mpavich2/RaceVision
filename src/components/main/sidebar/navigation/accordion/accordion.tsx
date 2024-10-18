/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../shared.css';

export function Accordion(props: {
  isActive: boolean;
  onClick: (index: number) => void;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className={`sidebarButton ${props.isActive ? 'active' : ''} accordion`}
      onClick={() => props.onClick(props.index)}
    >
      {props.children}
    </div>
  );
}
