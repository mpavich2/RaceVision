import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export const registerAutoUpdater = () => {
  autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info);
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new update is available. Downloading now...',
    });
  });

  autoUpdater.on('update-downloaded', async (info) => {
    log.info('Update downloaded:', info);

    try {
      const result = await dialog.showMessageBox({
        type: 'question',
        buttons: ['Restart', 'Later'],
        defaultId: 0,
        title: 'Update Ready',
        message: 'An update has been downloaded. Restart to apply?',
      });

      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    } catch (error) {
      log.error('An error has occurred', error);
    }
  });

  autoUpdater.on('error', (err) => {
    log.error('Update error:', err);
  });
};
