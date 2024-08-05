import { StrengthOfField } from '../../common/strengthOfField';
import { Temperature } from '../../common/temperature';
import { TemperatureUnits } from '../../../types/temperatureUnits';
import { IncidentCounter } from '../../common/incidentCounter';
import './header.css';

export function RelativeHeader() {
  const temperature = {
    value: 27,
    units: TemperatureUnits.CELSIUS,
  };
  const strengthOfField = 2730;
  const incidentInfo = {
    maxIncidents: 25,
    currentTotalIncidents: 6,
  };

  return (
    <div className="relativeHeader">
      <Temperature temp={temperature} />
      <StrengthOfField value={strengthOfField} />
      <IncidentCounter
        maxIncidents={incidentInfo.maxIncidents}
        currentTotalIncidents={incidentInfo.currentTotalIncidents}
      />
    </div>
  );
}
