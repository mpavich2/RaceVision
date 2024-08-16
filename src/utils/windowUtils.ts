import { BrowserWindow, Rectangle } from 'electron';
import Store from 'electron-store';

export const createOverlayWindow = (assetPath: string, preloadPath: string) => {
  return new BrowserWindow({
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
    icon: assetPath,
    webPreferences: {
      preload: preloadPath,
    },
  });
};

export const runWindowElectronStoreInfo = (
  window: BrowserWindow,
  file: string,
) => {
  const store = new Store();
  const storedBounds = store.get(file) as Partial<Rectangle>;

  if (storedBounds) {
    window.setBounds(storedBounds);
  }

  window.on('close', () => {
    store.set(file, window.getBounds());
  });
};
