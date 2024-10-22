import { useEffect, useState } from 'react';
import styles from './basic.module.css';
import { IPC_CHANNELS } from '../../../constants/ipcChannels';
import { ITelemetry } from '../../../types/iracing';
import { AbsLight } from './absLight';
import { CarSpeed } from './carSpeed';
import { DisplayUnits } from '../../../types/displayUnits';
import { CarRpm } from './carRpm';
import { ShiftLight } from './shiftLight';
import { CarGear } from './carGear/carGear';

export function BasicInputs() {
  const [carSpeed, setCarSpeed] = useState(0);
  const [carGear, setCarGear] = useState(0);
  const [carRpm, setCarRpm] = useState(0);
  const [isCarAbs, setIsCarAbs] = useState(false);
  const [blinkingShiftLightRpm, setBlinkingShiftLightRpm] = useState(
    Number.MAX_SAFE_INTEGER,
  );

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IPC_CHANNELS.IRACING_TELEMETRY_INFO,
      (telemetry: ITelemetry) => {
        setCarSpeed(telemetry.values.Speed);
        setCarGear(telemetry.values.Gear);
        setCarRpm(telemetry.values.RPM);
        setIsCarAbs(telemetry.values.BrakeABSactive);
        setCarRpm(telemetry.values.RPM);
        setBlinkingShiftLightRpm(telemetry.values.PlayerCarSLBlinkRPM);
      },
    );
  }, []);

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
