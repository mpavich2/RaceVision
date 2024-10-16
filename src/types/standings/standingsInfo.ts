import { IDriverInfo } from '../driverInfo';
import { IDriverClasses } from './driverClasses';

export interface IStandingsInfo {
  driverClasses: IDriverClasses[];
  userInfo?: IDriverInfo;
}
