import { createRoot } from 'react-dom/client';
import StandingsApp from './standings';
import './standings.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<StandingsApp />);
