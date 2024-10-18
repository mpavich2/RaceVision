/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { BsStack } from 'react-icons/bs';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { Logo } from '../logo';
import './sidebar.css';

export function Sidebar() {
  const [openIndex, setOpenIndex] = useState(0);
  // const [isDashBoardToggled, setIsDashBoardToggled] = useState(false);
  // const [isOverlaysToggled, setIsOverlaysToggled] = useState(false);

  const toggle = (index: number) => {
    setOpenIndex(index);
  };

  return (
    <div className="sidebarWrapper">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Logo />
      </div>
      <button
        className={`sidebarButton ${openIndex === 0 ? 'active' : ''}`}
        onClick={() => toggle(0)}
        type="button"
      >
        <RiDashboardHorizontalFill size={20} /> Dashboard
      </button>
      <div
        className={`sidebarButton ${openIndex === 1 ? 'active' : ''} accordion`}
        onClick={() => toggle(1)}
      >
        <div>
          <BsStack size={20} /> Overlays
        </div>

        {openIndex === 1 && (
          <div className="overlayList">
            <button className="overlayLineItem" type="button">
              Relatives
            </button>
            <button className="overlayLineItem" type="button">
              Standings
            </button>
            <button className="overlayLineItem" type="button">
              Input Graph
            </button>
            <button className="overlayLineItem" type="button">
              Advanced Panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
