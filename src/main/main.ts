/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath } from './util';
import { IPC_CHANNELS } from '../constants/ipcChannels';
import { ISessionInfo, ITelemetry } from '../types/iracing';
import { STORE_LOCATIONS } from '../constants/storeLocations';
import { runWindowElectronStoreInfo } from '../utils/windowUtils';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let relativeWindow: BrowserWindow | null = null;
let standingsWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// const isDebug =
//   process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'

// if (isDebug) {
//   require('electron-debug')({ devToolsMode: 'detach' })
// }

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer')
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS
//   const extensions = ['REACT_DEVELOPER_TOOLS']

//   return installer
//     .default(
//       extensions.map((name) => installer[name]),
//       forceDownload,
//     )
//     .catch(console.log)
// }

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

const preload = app.isPackaged
  ? path.join(__dirname, 'preload.js')
  : path.join(__dirname, '../../.erb/dll/preload.js');

const createRelativeWindow = () => {
  relativeWindow = new BrowserWindow({
    show: false,
    width: 600,
    height: 400,
    transparent: true,
    frame: false,
    resizable: true,
    roundedCorners: false,
    alwaysOnTop: true,
    minimizable: false,
    minHeight: 100,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload,
    },
  });
  runWindowElectronStoreInfo(relativeWindow, STORE_LOCATIONS.RELATIVE_WINDOW);
  relativeWindow.setAlwaysOnTop(true, 'screen-saver');

  relativeWindow.loadURL(resolveHtmlPath('index.html', 'relative'));

  relativeWindow.on('ready-to-show', () => {
    if (!relativeWindow) {
      throw new Error('"relativeWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      relativeWindow.minimize();
    } else {
      relativeWindow.show();
    }
  });

  relativeWindow.on('closed', () => {
    relativeWindow = null;
  });

  relativeWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

const createStandingsWindow = () => {
  standingsWindow = new BrowserWindow({
    show: false,
    width: 600,
    height: 400,
    transparent: true,
    frame: false,
    resizable: true,
    roundedCorners: false,
    alwaysOnTop: true,
    minimizable: false,
    minHeight: 100,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload,
    },
  });
  runWindowElectronStoreInfo(standingsWindow, STORE_LOCATIONS.STANDINGS_WINDOW);
  standingsWindow.setAlwaysOnTop(true, 'screen-saver');

  standingsWindow.loadURL(resolveHtmlPath('index.html', 'standings'));

  standingsWindow.on('ready-to-show', () => {
    if (!standingsWindow) {
      throw new Error('"standingsWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      standingsWindow.minimize();
    } else {
      standingsWindow.show();
    }
  });

  standingsWindow.on('closed', () => {
    standingsWindow = null;
  });

  standingsWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

const createWindows = async () => {
  // if (isDebug) {
  //   await installExtensions()
  // }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    relativeWindow = null;

    app.quit();
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  createRelativeWindow();
  createStandingsWindow();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater()
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindows();

    ipcMain.on(IPC_CHANNELS.OPEN_SPECIFIC_WINDOW, (_, windowName) => {
      if (windowName === STORE_LOCATIONS.RELATIVE_WINDOW && !relativeWindow) {
        createRelativeWindow();
      }

      if (windowName === STORE_LOCATIONS.STANDINGS_WINDOW && !standingsWindow) {
        createStandingsWindow();
      }
    });

    ipcMain.on(IPC_CHANNELS.SET_OPACITY, (_, opacity) => {
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send(IPC_CHANNELS.RECEIVE_OPACITY_UPDATE, opacity);
      });
    });

    ipcMain.on(IPC_CHANNELS.SET_IS_DRAGGABLE, (_, isDraggable) => {
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send(
          IPC_CHANNELS.RECEIVE_DRAGGABLE_UPDATE,
          isDraggable,
        );
      });
    });

    // start iracing connection
    const irsdk = require('iracing-sdk-js');

    irsdk.init({
      telemetryUpdateInterval: 10,
      sessionInfoUpdateInterval: 1000,
    });

    const iracing = irsdk.getInstance();

    console.log('\nwaiting for iRacing...');

    iracing.on('Connected', () => {
      console.log('\nConnected to iRacing.');

      iracing.once('Disconnected', () => {
        console.log('iRacing shut down.');

        BrowserWindow.getAllWindows().forEach((window) => {
          window.reload();
        });
      });

      iracing.on('SessionInfo', (sessionInfo: ISessionInfo) => {
        BrowserWindow.getAllWindows().forEach((window) => {
          window.webContents.send(
            IPC_CHANNELS.IRACING_SESSION_INFO,
            sessionInfo,
          );
        });
      });

      iracing.on('Telemetry', (telemetryInfo: ITelemetry) => {
        BrowserWindow.getAllWindows().forEach((window) => {
          window.webContents.send(
            IPC_CHANNELS.IRACING_TELEMETRY_INFO,
            telemetryInfo,
          );
        });
      });
    });

    app.on('activate', () => {
      if (mainWindow === null) {
        createWindows();
      }
    });
  })
  .catch(console.log);
