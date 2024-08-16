import { createRoot } from 'react-dom/client';
import { MainRouter } from './mainRouter';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<MainRouter />);
