import { useEffect } from 'react';
import {
  setDocumentDrag,
  setDocumentOpacity,
} from '../utils/commonDocumentUtils';
import { IPC_CHANNELS } from '../constants/ipcChannels';
import './standings.css';

export default function StandingsApp() {
  useEffect(() => {
    window.electron.ipcRenderer.on(
      IPC_CHANNELS.RECEIVE_OPACITY_UPDATE,
      (opacity: number) => {
        console.log('hit');
        setDocumentOpacity(opacity.toString());
      },
    );

    window.electron.ipcRenderer.on(
      IPC_CHANNELS.RECEIVE_DRAGGABLE_UPDATE,
      (isDraggable: boolean) => {
        setDocumentDrag(isDraggable);
      },
    );
  }, []);

  return (
    <div className="standingsWindow enableDrag">
      Hello Standings
      <div id="draggableWrapper">RELATIVE WINDOW</div>
    </div>
  );
}
