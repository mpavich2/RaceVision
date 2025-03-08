import { FuelLevel } from '../../components/fuelCalculator/fuelLevel';
import { useSession, useTelemetry } from '../../hooks/iracing';
import { useDraggable, useOpacity, useTitle } from '../../hooks/document';

export default function FuelCalculatorApp() {
  useTitle('Fuel Calculator');
  useDraggable();
  useOpacity();

  const sessionInfo = useSession();
  const telemetryInfo = useTelemetry();

  return (
    <div className="overlayWindow overlayDefaultBackgroundColor">
      <FuelLevel
        curFuel={telemetryInfo?.values.FuelLevel}
        maxFuel={sessionInfo?.data.DriverInfo.DriverCarFuelMaxLtr}
      />
      <div id="draggableWrapper">FUEL CALCULATOR WINDOW</div>
    </div>
  );
}
