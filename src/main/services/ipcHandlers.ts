import { BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { IpcChannels } from '../../constants/ipcChannels';
import { StoreLocations } from '../../constants/storeLocations';
import {
  deleteWindowElectronStoreInfo,
  getUserSettings,
  updateUserSettings,
} from '../storeUtils';
import { WindowManager } from './windowManager';

const getAllOverlayWindows = () => {
  return BrowserWindow.getAllWindows().filter(
    (win) => win.getTitle() !== StoreLocations.MAIN,
  );
};

export const registerIpcHandlers = (windows: WindowManager) => {
  ipcMain.on(IpcChannels.OPEN_SPECIFIC_WINDOW, (_, windowName) => {
    const existingWindow = windows.getWindow(windowName);

    if (existingWindow) {
      existingWindow.close();
    } else {
      windows.createOverlayWindow(windowName);
      const win = windows.getWindow(windowName);
      win?.once('ready-to-show', () => win.restore());
    }
  });

  ipcMain.on(IpcChannels.RESET_WINDOW_POSITIONS, () => {
    Object.values(StoreLocations).forEach((file) => {
      deleteWindowElectronStoreInfo(file);
    });

    getAllOverlayWindows().forEach((window) => {
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
    getAllOverlayWindows().forEach((window) => {
      window.webContents.send(IpcChannels.RECEIVE_OPACITY_UPDATE, opacity);
    });
  });

  ipcMain.handle(IpcChannels.GET_USER_SETTINGS, () => {
    const userSettings = getUserSettings();
    return userSettings;
  });

  ipcMain.on(IpcChannels.SET_IS_DRAGGABLE, (_, isDraggable) => {
    getAllOverlayWindows().forEach((window) => {
      window.webContents.send(
        IpcChannels.RECEIVE_DRAGGABLE_UPDATE,
        isDraggable,
      );

      window.setResizable(isDraggable);
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
