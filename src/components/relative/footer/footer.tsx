import { useState } from 'react';
import { LapCounter } from '../../common/lapCounter';
import { RaceTimer } from '../../common/raceTimer';
import './footer.css';

export function RelativeFooter() {
  const [currentLap] = useState(12);
  const [totalLaps] = useState(25.6);
  const [currentTime] = useState('20:12');
  const [endTime] = useState('45m');

  return (
    <div className="relativeFooter">
      <LapCounter currentLap={currentLap} totalLaps={totalLaps} />
      <RaceTimer currentTime={currentTime} endTime={endTime} />
    </div>
  );
}
