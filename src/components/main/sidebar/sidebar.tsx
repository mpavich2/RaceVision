/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BsStack } from 'react-icons/bs';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { Logo } from '../logo';
import styles from './sidebar.module.css';
import { Tab } from './navigation/tab';
import { Accordion } from './navigation/accordion';
import { useAppContext } from '../contextProvider';
import { AccordionDetailLineItem } from './navigation/accordion/detailLineItem';

export function Sidebar() {
  const {
    openNavIndex,
    setOpenNavIndex,
    openOverlayNavIndex,
    setOpenOverlayNavIndex,
  } = useAppContext();

  const toggleNavItem = (index: number) => {
    setOpenNavIndex(index);
  };

  const overlayNavClicked = (index: number) => {
    setOpenOverlayNavIndex(index);
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Logo />
      </div>

      <Tab
        isActive={openNavIndex === 0}
        onClick={() => toggleNavItem(0)}
        index={0}
      >
        <RiDashboardHorizontalFill size={20} /> Dashboard
      </Tab>

      <Accordion
        isActive={openNavIndex === 1}
        onClick={() => toggleNavItem(1)}
        index={1}
      >
        <div className={styles.textAlign}>
          <BsStack size={20} /> Overlays
        </div>

        {openNavIndex === 1 && (
          <div className={styles.overlayList}>
            <AccordionDetailLineItem
              isActive={openOverlayNavIndex === 0}
              onClick={() => overlayNavClicked(0)}
              title="Relatives"
            />
            <AccordionDetailLineItem
              isActive={openOverlayNavIndex === 1}
              onClick={() => overlayNavClicked(1)}
              title="Standings"
            />
            <AccordionDetailLineItem
              isActive={openOverlayNavIndex === 2}
              onClick={() => overlayNavClicked(2)}
              title="Input Graph"
            />
            <AccordionDetailLineItem
              isActive={openOverlayNavIndex === 3}
              onClick={() => overlayNavClicked(3)}
              title="Advanced Panel"
            />
            <AccordionDetailLineItem
              isActive={openOverlayNavIndex === 4}
              onClick={() => overlayNavClicked(4)}
              title="Fuel Calc"
            />
            <AccordionDetailLineItem
              isActive={openOverlayNavIndex === 5}
              onClick={() => overlayNavClicked(5)}
              title="Track Map"
            />
          </div>
        )}
      </Accordion>

      <Tab
        isActive={openNavIndex === 2}
        onClick={() => toggleNavItem(2)}
        index={2}
      >
        <IoMdSettings size={20} /> Settings
      </Tab>
    </div>
  );
}
