import { getDriverLicenseColor } from '../../../../services/determineDriverColors';
import './license.css';

export function LicenseClass(props: { licenseSafetyRatingCombined: string }) {
  const licenseColor = getDriverLicenseColor(props.licenseSafetyRatingCombined);

  return (
    <div style={{ lineHeight: '1rem' }}>
      <div
        className="licenseWrapper"
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
