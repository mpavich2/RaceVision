import { COLOR_CONSTANTS } from '../constants/colorConstants';
import { IRelativeDriverData } from '../types/relative';
import {
  ISessionClassColorInfo,
  ISessionClassColorInfoMap,
} from '../types/sessionClassColorInfo';

export const generateSessionClassColors = (
  data: IRelativeDriverData[],
): ISessionClassColorInfoMap => {
  const driverDataReducedToClassInfo = data
    .sort((d) => d.carRelativeSpeed)
    .map((d) => {
      return {
        carClass: d.carClass,
        carRelativeSpeed: d.carRelativeSpeed,
      };
    });

  const uniqueClassInfo = driverDataReducedToClassInfo.filter(
    (current, index, self) =>
      index ===
      self.findIndex(
        (other) =>
          other.carClass === current.carClass &&
          other.carRelativeSpeed === current.carRelativeSpeed,
      ),
  );

  const classColorInfo = uniqueClassInfo.map((d, index) => {
    const colorInfo = Object.values(COLOR_CONSTANTS.CLASS_COLORS)[
      index
    ] as ISessionClassColorInfo['carClassColorsInfo'];
    return {
      ...d,
      carClassColorsInfo: colorInfo,
    };
  });

  const colorMap: ISessionClassColorInfoMap = {};
  classColorInfo.forEach((info) => {
    colorMap[info.carRelativeSpeed] = info.carClassColorsInfo;
  });

  return colorMap;
};
