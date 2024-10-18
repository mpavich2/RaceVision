import { useAppContext } from '../contextProvider';
import { OverlaysContent } from './overlays';
import { DashboardContent } from './dashboard';
import { SettingsContent } from './settings';

export function MainContent() {
  const { openNavIndex } = useAppContext();

  return (
    <div>
      {openNavIndex === 0 && <DashboardContent />}
      {openNavIndex === 1 && <OverlaysContent />}
      {openNavIndex === 2 && <SettingsContent />}
    </div>
  );
}
