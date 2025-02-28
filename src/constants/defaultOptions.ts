import { BrowserWindowConstructorOptions } from 'electron';
import { StoreLocations } from './storeLocations';

export const DEFAULT_OPTIONS: {
  [key: string]: BrowserWindowConstructorOptions;
} = {
  [StoreLocations.INPUT_GRAPH_WINDOW]: {
    width: 600,
    height: 200,
  },
  [StoreLocations.INPUTS_WINDOW]: {
    width: 435,
    height: 130,
    minWidth: 435,
    minHeight: 130,
  },
  default: {
    width: 600,
    height: 400,
    minHeight: 100,
  },
};
