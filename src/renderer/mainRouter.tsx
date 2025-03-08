import { HashRouter, Route, Routes } from 'react-router-dom';
import RelativeApp from './routes/relative';
import StandingsApp from './routes/standings';
import MainApp from './routes/main';
import InputGraphApp from './routes/inputGraph';
import InputsApp from './routes/inputs';
import FuelCalculatorApp from './routes/fuelCalculator';
import TrackMapApp from './routes/trackMap';

export function MainRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/relative" element={<RelativeApp />} />
        <Route path="/standings" element={<StandingsApp />} />
        <Route path="/inputGraph" element={<InputGraphApp />} />
        <Route path="/inputs" element={<InputsApp />} />
        <Route path="/fuelCalculator" element={<FuelCalculatorApp />} />
        <Route path="/trackMap" element={<TrackMapApp />} />
      </Routes>
    </HashRouter>
  );
}
