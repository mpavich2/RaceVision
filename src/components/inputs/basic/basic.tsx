import { useEffect, useState } from 'react';
import styles from './basic.module.css';
import { AbsLight } from './absLight';
import { CarSpeed } from './carSpeed';
import { DisplayUnits } from '../../../types/displayUnits';
import { CarRpm } from './carRpm';
import { ShiftLight } from './shiftLight';
import { CarGear } from './carGear/carGear';
import { useTelemetry } from '../../../hooks/iracing';

export function BasicInputs() {
  const telemetryInfo = useTelemetry();

  const [carSpeed, setCarSpeed] = useState(0);
  const [carGear, setCarGear] = useState(0);
  const [carRpm, setCarRpm] = useState(0);
  const [isCarAbs, setIsCarAbs] = useState(false);
  const [blinkingShiftLightRpm, setBlinkingShiftLightRpm] = useState(
    Number.MAX_SAFE_INTEGER,
  );

  useEffect(() => {
    if (telemetryInfo) {
      setCarSpeed(telemetryInfo.values.Speed);
      setCarGear(telemetryInfo.values.Gear);
      setCarRpm(telemetryInfo.values.RPM);
      setIsCarAbs(telemetryInfo.values.BrakeABSactive);
      setCarRpm(telemetryInfo.values.RPM);
      setBlinkingShiftLightRpm(telemetryInfo.values.PlayerCarSLBlinkRPM);
    }
  }, [telemetryInfo]);

  return (
    <div className={styles.basicInputsWrapper}>
      <CarGear gear={carGear} />

      <div className={styles.carInfoWrapper}>
        <ShiftLight
          currentRpm={carRpm}
          blinkingShiftLightRpm={blinkingShiftLightRpm}
        />

        <div className={styles.carSpeedAndRpm}>
          <CarSpeed speed={carSpeed} units={DisplayUnits.MPH} />

          <CarRpm rpm={carRpm} />
        </div>
      </div>

      <div className={styles.carAbs}>
        <AbsLight isAbsActive={isCarAbs} />
      </div>
    </div>
  );
}
