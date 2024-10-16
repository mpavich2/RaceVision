import { IStandingsDriverData } from './driverData';

export interface IDriverClasses {
  drivers: IStandingsDriverData[];
  classRelativeSpeed: number;
  classFastestCarIdx?: number;
  className: string;
  classColor: string;
  isUserClass: boolean;
}
