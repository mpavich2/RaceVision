import { MainHeader } from '../header';
import { DarkModeToggle } from './toggles/darkMode';
import { DragToggle } from './toggles/drag';
import styles from './settings.module.css';
import { OpacityRangeSlider } from './range/opacity';

export function SettingsContent() {
  return (
    <div>
      <MainHeader text="Settings" />

      <h3>General</h3>
      <div className={styles.indentSubContent}>
        <DarkModeToggle />
      </div>

      <h3>Overlays</h3>
      <div className={styles.indentSubContent}>
        <DragToggle />
        <OpacityRangeSlider />
      </div>
    </div>
  );
}
