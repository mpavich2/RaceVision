import { BrowserWindow, Rectangle } from 'electron';
import Store from 'electron-store';
import { IUserSettings } from '../types/userSettings';
import { StoreLocations } from '../constants/storeLocations';

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
  const currentSettings = store.get(StoreLocations.SETTINGS) as IUserSettings;
  store.set(StoreLocations.SETTINGS, { ...currentSettings, ...newSettings });
};

export const getUserSettings = (): IUserSettings => {
  const store = new Store();
  const storedSettings = store.get(StoreLocations.SETTINGS) as IUserSettings;

  if (!storedSettings) {
    const defaultSettings = {
      isDarkMode: false,
      opacity: 0.8,
    };
    store.set(StoreLocations.SETTINGS, defaultSettings);

    return defaultSettings;
  }

  return storedSettings;
};
