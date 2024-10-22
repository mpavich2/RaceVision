import { getDriverLicenseColor } from '../../../../services/determineDriverColors';
import styles from './license.module.css';

export function LicenseClass(props: { licenseSafetyRatingCombined: string }) {
  const licenseColor = getDriverLicenseColor(props.licenseSafetyRatingCombined);

  return (
    <div style={{ lineHeight: '1rem' }}>
      <div
        className={styles.licenseWrapper}
        style={{
          backgroundColor: licenseColor.BACKGROUND,
          color: licenseColor.FONT,
        }}
      >
        <div>{props.licenseSafetyRatingCombined}</div>
      </div>
    </div>
  );
}
