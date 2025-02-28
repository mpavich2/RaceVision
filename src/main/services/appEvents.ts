import { app, BrowserWindow } from 'electron';

export const registerAppEvents = (
  mainWindow: BrowserWindow | null,
  createWindows: () => Promise<void>,
) => {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindows();
    }
  });
};
