import { useAppContext } from '../contextProvider';
import { OverlaysContent } from './overlays';
import { DashboardContent } from './dashboard';
import { SettingsContent } from './settings';
import styles from './content.module.css';

export function MainContent() {
  const { openNavIndex } = useAppContext();

  return (
    // TODO: change to list, remove hardcoded indexes
    <div className={styles.contentWrapper}>
      {openNavIndex === 0 && <DashboardContent />}
      {openNavIndex === 1 && <OverlaysContent />}
      {openNavIndex === 2 && <SettingsContent />}
    </div>
  );
}
