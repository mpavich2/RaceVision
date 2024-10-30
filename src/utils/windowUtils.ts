import { BrowserWindow, Rectangle } from 'electron';
import Store from 'electron-store';
import { IUserSettings } from '../types/userSettings';
import { STORE_LOCATIONS } from '../constants/storeLocations';

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

export const deleteWindowElectronStoreInfo = (file: string) => {
  const store = new Store();
  store.delete(file);
};

export const updateUserSettings = (newSettings: Partial<IUserSettings>) => {
  const store = new Store();
  const currentSettings = store.get(STORE_LOCATIONS.SETTINGS) as IUserSettings;
  store.set(STORE_LOCATIONS.SETTINGS, { ...currentSettings, ...newSettings });
};

export const getUserSettings = (): IUserSettings => {
  const store = new Store();
  const storedSettings = store.get(STORE_LOCATIONS.SETTINGS) as IUserSettings;

  if (!storedSettings) {
    const defaultSettings = {
      isDarkMode: false,
      opacity: 0.8,
    };
    store.set(STORE_LOCATIONS.SETTINGS, defaultSettings);

    return defaultSettings;
  }

  return storedSettings;
};
