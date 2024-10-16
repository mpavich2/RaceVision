import { BsDashLg } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import { shortenIrating } from '../../../../utils/iratingUtils';
import './irating.css';

export function Irating(props: {
  irating: number;
  iratingDiff?: number;
  hideIratingDiff?: boolean;
}) {
  const shortenedIrating = shortenIrating(props.irating);
  const iratingDiff = Math.round(props.iratingDiff || 0)
    .toString()
    .replaceAll('-', '');

  if (!props.iratingDiff && props.hideIratingDiff) {
    return <div className="iratingWrapper">{shortenedIrating}</div>;
  }

  const iratingDiffIcon = (diff: number) => {
    if (diff > 0) {
      return <FaChevronUp color={COLOR_CONSTANTS.IRATING_COLORS.POSITIVE} />;
    }
    if (diff < 0) {
      return <FaChevronDown color={COLOR_CONSTANTS.IRATING_COLORS.NEGATIVE} />;
    }
    return <BsDashLg color={COLOR_CONSTANTS.IRATING_COLORS.NEUTRAL} />;
  };

  return (
    <div style={{ lineHeight: '1rem' }}>
      <div className="iratingWrapper">
        <div style={{ flex: 1.5, minWidth: '2.5rem' }}>{shortenedIrating}</div>
        {props.iratingDiff && (
          <div>
            <div
              style={{
                flex: 0.5,
                minWidth: '1rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {iratingDiffIcon(props.iratingDiff)}
            </div>

            <div style={{ flex: 0.5, minWidth: '1.6rem', textAlign: 'right' }}>
              {iratingDiff}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
