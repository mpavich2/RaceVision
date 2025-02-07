import { BsDashLg } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { ReactNode } from 'react';
import { COLOR_CONSTANTS } from '../../../../constants/colorConstants';
import { shortenIrating } from '../../../../utils/iratingUtils';
import styles from './irating.module.css';

const determineIratingDiffColor = (
  diff?: number,
): {
  color: string;
  icon: ReactNode;
} => {
  const defaultDiffSettings = {
    color: COLOR_CONSTANTS.IRATING_COLORS.NEUTRAL,
    icon: <BsDashLg color={COLOR_CONSTANTS.IRATING_COLORS.NEUTRAL} />,
  };

  if (!diff || diff === 0) {
    return defaultDiffSettings;
  }

  if (diff > 0) {
    return {
      color: COLOR_CONSTANTS.IRATING_COLORS.POSITIVE,
      icon: <FaChevronUp color={COLOR_CONSTANTS.IRATING_COLORS.POSITIVE} />,
    };
  }
  if (diff < 0) {
    return {
      color: COLOR_CONSTANTS.IRATING_COLORS.NEGATIVE,
      icon: <FaChevronDown color={COLOR_CONSTANTS.IRATING_COLORS.NEGATIVE} />,
    };
  }

  return defaultDiffSettings;
};

export function Irating(props: {
  irating: number;
  iratingDiff?: number;
  hideIratingDiff?: boolean;
}) {
  const shortenedIrating = shortenIrating(props.irating);
  const iratingDiff = Math.abs(Math.round(props.iratingDiff || 0)).toString();
  const iratingDiffSettings = determineIratingDiffColor(props.iratingDiff);

  if (props.hideIratingDiff) {
    return <div className={styles.iratingWrapper}>{shortenedIrating}</div>;
  }

  return (
    <div style={{ lineHeight: '1rem' }}>
      <div className={styles.iratingWrapper}>
        <div style={{ flex: 1.5, paddingRight: '0.5rem', minWidth: '2.5rem' }}>
          {shortenedIrating}
        </div>

        <div
          style={{
            flex: 0.5,
            minWidth: '1rem',
            display: 'flex',
            alignItems: 'center',
            paddingRight: '0.2rem',
          }}
        >
          {iratingDiffSettings.icon}
        </div>

        <div
          style={{
            flex: 0.5,
            textAlign: 'right',
            minWidth: '1.6rem',
            color: iratingDiffSettings.color,
          }}
        >
          {iratingDiff}
        </div>
      </div>
    </div>
  );
}
