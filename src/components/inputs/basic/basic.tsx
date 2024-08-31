import { useEffect, useState } from 'react';
import './basic.css';
import { IPC_CHANNELS } from '../../../constants/ipcChannels';
import { ITelemetry } from '../../../types/iracing';
import { AbsLight } from './absLight';
import { CarSpeed } from './carSpeed';
import { DisplayUnits } from '../../../types/displayUnits';
import { CarRpm } from './carRpm';
import { ShiftLight } from './shiftLight';

const calculateGear = (gear: number) => {
  if (gear === -1) {
    return 'R';
  }

  if (gear === 0) {
    return 'N';
  }

  return gear;
};

export function BasicInputs() {
  const [carSpeed, setCarSpeed] = useState(0);
  const [carGear, setCarGear] = useState(0);
  const [carRpm, setCarRpm] = useState(0);
  const [isCarAbs, setIsCarAbs] = useState(false);
  const [firstShiftLightRpm, setFirstShiftLightRpm] = useState(6300);
  const [secondShiftLightRpm, setSecondShiftLightRpm] = useState(6500);
  const [lastShiftLightRpm, setLastShiftLightRpm] = useState(6700);
  const [blinkingShiftLightRpm, setBlinkingShiftLightRpm] = useState(6900);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IPC_CHANNELS.IRACING_TELEMETRY_INFO,
      (telemetry: ITelemetry) => {
        setCarSpeed(telemetry.values.Speed);
        setCarGear(telemetry.values.Gear);
        setCarRpm(telemetry.values.RPM);
        setIsCarAbs(telemetry.values.BrakeABSactive);
        setCarRpm(telemetry.values.RPM);
        setFirstShiftLightRpm(telemetry.values.PlayerCarSLFirstRPM);
        setSecondShiftLightRpm(telemetry.values.PlayerCarSLShiftRPM);
        setLastShiftLightRpm(telemetry.values.PlayerCarSLLastRPM);
        setBlinkingShiftLightRpm(telemetry.values.PlayerCarSLBlinkRPM);
      },
    );
  }, []);

  return (
    <div className="basicInputsWrapper">
      <div className="carGear">{calculateGear(carGear)}</div>

      <ShiftLight
        currentRpm={carRpm}
        firstShiftLightRpm={firstShiftLightRpm}
        secondShiftLightRpm={secondShiftLightRpm}
        lastShiftLightRpm={lastShiftLightRpm}
        blinkingShiftLightRpm={blinkingShiftLightRpm}
      />

      <CarSpeed speed={carSpeed} units={DisplayUnits.MPH} />

      <CarRpm rpm={carRpm} />

      <div className="carAbs">
        <AbsLight isAbsActive={isCarAbs} />
      </div>
    </div>
  );
}
