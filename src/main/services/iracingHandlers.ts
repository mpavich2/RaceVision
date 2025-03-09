/* eslint global-require: off, no-console: off */

import { BrowserWindow } from 'electron';
import { IpcChannels } from '../../constants/ipcChannels';
import { ISessionInfo, ITelemetry } from '../../types/iracing';
import { StoreLocations } from '../../constants/storeLocations';

const getAllOverlayWindows = () => {
  return BrowserWindow.getAllWindows().filter(
    (win) => win.getTitle() !== StoreLocations.MAIN,
  );
};

const sendToAllOverlayWindows = (
  channel: string,
  data: ISessionInfo | ITelemetry,
) => {
  getAllOverlayWindows().forEach((window) => {
    window.webContents.send(channel, data);
  });
};

const reloadAllOverlayWindows = () => {
  getAllOverlayWindows().forEach((window) => {
    window.reload();
    window.minimize();
  });
};

const restoreAllOverlayWindows = () => {
  getAllOverlayWindows().forEach((window) => {
    // restore if running when iracing launched
    window.restore();

    // restore if app launching and window starts minimized
    window.on('ready-to-show', () => {
      window.restore();
      console.log('restoring window');
    });
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
    restoreAllOverlayWindows();

    iracing.on('Disconnected', () => {
      console.info('iRacing shut down.');

      reloadAllOverlayWindows();
    });

    iracing.on('SessionInfo', (sessionInfo: ISessionInfo) => {
      sendToAllOverlayWindows(IpcChannels.IRACING_SESSION_INFO, sessionInfo);
    });

    iracing.on('Telemetry', (telemetryInfo: ITelemetry) => {
      sendToAllOverlayWindows(
        IpcChannels.IRACING_TELEMETRY_INFO,
        telemetryInfo,
      );
    });
  });
};
