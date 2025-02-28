import { BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { IpcChannels } from '../../constants/ipcChannels';
import { StoreLocations } from '../../constants/storeLocations';
import {
  deleteWindowElectronStoreInfo,
  getUserSettings,
  updateUserSettings,
} from '../storeUtils';
import { WindowManager } from './windowManager';

export const registerIpcHandlers = (windows: WindowManager) => {
  ipcMain.on(IpcChannels.OPEN_SPECIFIC_WINDOW, (_, windowName) => {
    const existingWindow = windows.getWindow(windowName);

    if (existingWindow) {
      existingWindow.close();
    } else {
      windows.createOverlayWindow(windowName);
    }
  });

  ipcMain.on(IpcChannels.RESET_WINDOW_POSITIONS, () => {
    Object.values(StoreLocations).forEach((file) => {
      deleteWindowElectronStoreInfo(file);
    });

    BrowserWindow.getAllWindows().forEach((window) => {
      if (window.webContents !== windows.getMainWindow()?.webContents) {
        window.setPosition(0, 0, false);
      }
    });
  });

  ipcMain.on(IpcChannels.RESET_SPECIFIC_WINDOW_POSITION, (_, windowName) => {
    windows.getWindow(windowName)?.setPosition(0, 0, false);
  });

  ipcMain.on(IpcChannels.SET_OPACITY, (_, opacity) => {
    updateUserSettings({ opacity });
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send(IpcChannels.RECEIVE_OPACITY_UPDATE, opacity);
    });
  });

  ipcMain.handle(IpcChannels.GET_USER_SETTINGS, () => {
    const userSettings = getUserSettings();
    return userSettings;
  });

  ipcMain.handle(IpcChannels.IS_WINDOW_OPEN, (_, windowName) => {
    return windows.getWindow(windowName) !== null;
  });

  ipcMain.on(IpcChannels.SET_IS_DRAGGABLE, (_, isDraggable) => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send(
        IpcChannels.RECEIVE_DRAGGABLE_UPDATE,
        isDraggable,
      );
    });
  });

  ipcMain.on(IpcChannels.DARK_MODE_TOGGLE, () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    updateUserSettings({ isDarkMode: nativeTheme.shouldUseDarkColors });
    return nativeTheme.shouldUseDarkColors;
  });
};
