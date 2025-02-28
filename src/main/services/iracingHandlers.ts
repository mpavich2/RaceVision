/* eslint global-require: off, no-console: off */

import { BrowserWindow } from 'electron';
import { IpcChannels } from '../../constants/ipcChannels';
import { ISessionInfo, ITelemetry } from '../../types/iracing';

const sendToAllWindows = (channel: string, data: ISessionInfo | ITelemetry) => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send(channel, data);
  });
};

const reloadAllWindows = () => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.reload();
  });
};

export const initializeIRacing = () => {
  const irsdk = require('iracing-sdk-js');

  irsdk.init({
    telemetryUpdateInterval: 10,
    sessionInfoUpdateInterval: 10,
  });

  const iracing = irsdk.getInstance();

  console.info('\nWaiting for iRacing...');

  iracing.on('Connected', () => {
    console.info('\nConnected to iRacing.');

    iracing.once('Disconnected', () => {
      console.info('iRacing shut down.');

      reloadAllWindows();
    });

    iracing.on('SessionInfo', (sessionInfo: ISessionInfo) => {
      sendToAllWindows(IpcChannels.IRACING_SESSION_INFO, sessionInfo);
    });

    iracing.on('Telemetry', (telemetryInfo: ITelemetry) => {
      sendToAllWindows(IpcChannels.IRACING_TELEMETRY_INFO, telemetryInfo);
    });
  });
};
