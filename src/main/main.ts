/* eslint global-require: off, no-console: off, promise/always-return: off, no-new: off */

import { app, nativeTheme } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { StoreLocations } from '../constants/storeLocations';
import { getUserSettings } from './storeUtils';
import { registerAppEvents } from './services/appEvents';
import { registerAutoUpdater } from './services/autoUpdater';
import { WindowManager } from './services/windowManager';
import { registerIpcHandlers } from './services/ipcHandlers';
import { initializeIRacing } from './services/iracingHandlers';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const windows = new WindowManager();

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const createWindows = async () => {
  windows.createMainWindow();

  windows.createOverlayWindow(StoreLocations.RELATIVE_WINDOW);
  windows.createOverlayWindow(StoreLocations.STANDINGS_WINDOW);
  windows.createOverlayWindow(StoreLocations.INPUT_GRAPH_WINDOW);
  windows.createOverlayWindow(StoreLocations.INPUTS_WINDOW);
  windows.createOverlayWindow(StoreLocations.TRACK_MAP);
  // windows.createWindow(StoreLocations.FUEL_CALCULATOR);

  new AppUpdater();
};

app
  .whenReady()
  .then(() => {
    createWindows();
    const { isDarkMode } = getUserSettings();
    nativeTheme.themeSource = isDarkMode ? 'dark' : 'light';

    registerAppEvents(windows.getMainWindow()!, createWindows);
    registerAutoUpdater();
    registerIpcHandlers(windows);

    initializeIRacing();
  })
  .catch(console.log);
