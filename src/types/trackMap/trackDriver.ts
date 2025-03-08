import { ISessionInfo } from '../iracing';

export type TrackDriver = {
  progress: number;
  isPlayer: boolean;
  driver: ISessionInfo['data']['DriverInfo']['Drivers'][0];
};
