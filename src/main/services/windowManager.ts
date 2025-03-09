import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  shell,
} from 'electron';
import path from 'path';
import { getAssetPath } from '../../utils/assetUtils';
import { runWindowElectronStoreInfo } from '../storeUtils';
import { resolveHtmlPath } from '../util';
import { DEFAULT_OPTIONS } from '../../constants/defaultOptions';
import { StoreLocations } from '../../constants/storeLocations';
import { IpcChannels } from '../../constants/ipcChannels';

export class WindowManager {
  windows: Map<string, BrowserWindow>;

  preload: string;

  constructor() {
    this.windows = new Map();
    this.preload = app.isPackaged
      ? path.join(__dirname, 'preload.js')
      : path.join(__dirname, '../../../.erb/dll/preload.js');
  }

  createOverlayWindow(name: string, options?: BrowserWindowConstructorOptions) {
    if (this.windows.has(name)) {
      return this.windows.get(name);
    }

    const winSpecificOptions = DEFAULT_OPTIONS[name] || DEFAULT_OPTIONS.default;

    const win = new BrowserWindow({
      title: name,
      show: false,
      transparent: true,
      frame: false,
      resizable: false,
      roundedCorners: false,
      alwaysOnTop: true,
      minimizable: false,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: this.preload,
      },
      ...winSpecificOptions,
      ...options,
    });
    this.windows.set(name, win);
    runWindowElectronStoreInfo(win, name);
    win.setAlwaysOnTop(true, 'screen-saver');

    win.loadURL(resolveHtmlPath('index.html', name));

    win.on('ready-to-show', () => {
      if (!win) {
        throw new Error(`"${name}" is not defined`);
      }

      this.getMainWindow()?.webContents.send(
        IpcChannels.WINDOW_OPEN_STATUS,
        true,
      );
      if (process.env.START_MINIMIZED) {
        win.minimize();
      } else {
        win.show();
      }
    });

    win.once('show', () => {
      win.minimize();
    });

    win.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    win.on('closed', () => {
      try {
        this.getMainWindow()?.webContents.send(
          IpcChannels.WINDOW_OPEN_STATUS,
          false,
        );
      } catch (error) {
        console.error(`Window ${name} closed`);
      }
      this.windows.delete(name);
    });

    return win;
  }

  createMainWindow() {
    const mainWindow = new BrowserWindow({
      show: false,
      title: StoreLocations.MAIN,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      autoHideMenuBar: true,
      webPreferences: {
        preload: this.preload,
      },
    });
    this.windows.set(StoreLocations.MAIN, mainWindow);

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
      if (!mainWindow) {
        throw new Error(`"${StoreLocations.MAIN}" is not defined`);
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
      }
    });

    mainWindow.on('closed', () => {
      app.quit();
    });

    mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });
  }

  getWindow(name: string) {
    return this.windows.get(name);
  }

  getMainWindow() {
    return this.windows.get(StoreLocations.MAIN);
  }

  getAllWindows() {
    return Array.from(this.windows.values());
  }
}
