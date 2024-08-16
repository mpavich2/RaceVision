import { HashRouter, Route, Routes } from 'react-router-dom';
import RelativeApp from './routes/relative';
import StandingsApp from './routes/standings';
import MainApp from './routes/main';

export function MainRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/relative" element={<RelativeApp />} />
        <Route path="/standings" element={<StandingsApp />} />
      </Routes>
    </HashRouter>
  );
}
