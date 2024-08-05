import { createRoot } from 'react-dom/client';
import RelativeApp from './relative';
import './relative.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<RelativeApp />);
