/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
import { ShiftingLight } from './light';
import './shiftLight.css';

const SHIFT_LIGHT_COUNT = 10;
const SHIFT_WARNING_START_INDEX = SHIFT_LIGHT_COUNT - 4;

export function ShiftLight(props: {
  currentRpm: number;
  firstShiftLightRpm: number;
  secondShiftLightRpm: number;
  lastShiftLightRpm: number;
  blinkingShiftLightRpm: number;
}) {
  function calculateShiftLights(midRPM: number, maxRPM: number, index: number) {
    return midRPM + (index * (maxRPM - midRPM)) / SHIFT_LIGHT_COUNT;
  }

  const isShiftWarningLight = (shiftLightIndex: number) => {
    return shiftLightIndex >= SHIFT_WARNING_START_INDEX;
  };

  const isLightActive = (shiftLightIndex: number) => {
    // TODO: Investigate if there is better formula for this
    const rpmAtIndex = calculateShiftLights(
      props.firstShiftLightRpm / 2,
      props.firstShiftLightRpm,
      shiftLightIndex,
    );

    if (
      shiftLightIndex === SHIFT_WARNING_START_INDEX &&
      props.currentRpm >= props.firstShiftLightRpm
    ) {
      return true;
    }

    if (
      shiftLightIndex === SHIFT_WARNING_START_INDEX + 1 &&
      props.currentRpm >= props.secondShiftLightRpm
    ) {
      return true;
    }

    if (
      shiftLightIndex === SHIFT_WARNING_START_INDEX + 2 &&
      props.currentRpm >= props.lastShiftLightRpm
    ) {
      return true;
    }

    if (
      props.currentRpm >= rpmAtIndex &&
      shiftLightIndex < SHIFT_WARNING_START_INDEX
    ) {
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
          isBlinking={props.currentRpm >= props.blinkingShiftLightRpm}
          isActive={isLightActive(index)}
        />,
      );
    }

    return shiftLightDivs;
  };

  return (
    <div className="shiftLightsWrapper">
      {shiftLights().map((light: any) => {
        return light;
      })}
    </div>
  );
}
