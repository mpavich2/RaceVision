import { useEffect, useState } from 'react';
import { ISessionInfo } from '../../types/iracing';
import { IpcChannels } from '../../constants/ipcChannels';

// sample data imports
// import SampleSession from '../../sampleData/sampleSessionInfo.json';

export const useSession = () => {
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo>();

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.IRACING_SESSION_INFO,
      (session: ISessionInfo) => {
        setSessionInfo(session);
      },
    );
  }, []);

  return sessionInfo;
};
