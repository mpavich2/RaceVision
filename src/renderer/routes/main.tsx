import './main.css';
import { Sidebar } from '../../components/main/sidebar';
import { MainContent } from '../../components/main/content';
import ContextProvider from '../../components/main/contextProvider';

export default function MainApp() {
  return (
    <ContextProvider>
      <div className="mainBackground">
        <div style={{ maxWidth: '12rem', minWidth: '12rem', flexGrow: 0 }}>
          <Sidebar />
        </div>

        <div style={{ flexGrow: 1 }}>
          <MainContent />
        </div>
      </div>
    </ContextProvider>
  );
}
