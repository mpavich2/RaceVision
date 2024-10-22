/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
import { ShiftingLight } from './light';
import styles from './shiftLight.module.css';

const SHIFT_LIGHT_COUNT = 10;

export function ShiftLight(props: {
  currentRpm: number;
  blinkingShiftLightRpm: number;
}) {
  const calculateShiftLights = (
    midRPM: number,
    maxRPM: number,
    index: number,
  ) => {
    return midRPM + (index * (maxRPM - midRPM)) / SHIFT_LIGHT_COUNT;
  };

  const isShiftWarningLight = (shiftLightIndex: number) => {
    return shiftLightIndex >= SHIFT_LIGHT_COUNT - 4;
  };

  const isLightActive = (shiftLightIndex: number) => {
    const rpmAtIndex = calculateShiftLights(
      props.blinkingShiftLightRpm / 2,
      props.blinkingShiftLightRpm,
      shiftLightIndex,
    );

    if (props.currentRpm >= rpmAtIndex) {
      return true;
    }

    return false;
  };

  const shiftLights: any = () => {
    const shiftLightDivs = [];
    for (let index = 0; index < SHIFT_LIGHT_COUNT; index++) {
      shiftLightDivs.push(
        <ShiftingLight
          isWarningLight={isShiftWarningLight(index)}
          isBlinking={props.currentRpm >= props.blinkingShiftLightRpm - 200}
          isActive={isLightActive(index)}
          key={index}
        />,
      );
    }

    return shiftLightDivs;
  };

  return (
    <div className={styles.shiftLightsWrapper}>
      {shiftLights().map((light: any) => {
        return light;
      })}
    </div>
  );
}
