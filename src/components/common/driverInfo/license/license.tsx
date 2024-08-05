import { determineDriverLicenseColor } from '../../../../services/determineDriverColors';
import './license.css';

export function LicenseClass(props: { licenseSafetyRatingCombined: string }) {
  const licenseColor = determineDriverLicenseColor(
    props.licenseSafetyRatingCombined,
  );

  return (
    <div style={{ lineHeight: '1rem' }}>
      <div className="licenseWrapper" style={{ backgroundColor: licenseColor }}>
        <div>{props.licenseSafetyRatingCombined}</div>
      </div>
    </div>
  );
}
