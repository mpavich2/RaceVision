import { COLOR_CONSTANTS } from '../constants/colorConstants';

export const determineDriverLicenseColor = (
  licenseSafetyRatingCombined: string,
) => {
  if (licenseSafetyRatingCombined.includes('R')) {
    return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.R;
  }

  if (licenseSafetyRatingCombined.includes('D')) {
    return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.D;
  }

  if (licenseSafetyRatingCombined.includes('C')) {
    return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.C;
  }

  if (licenseSafetyRatingCombined.includes('B')) {
    return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.B;
  }

  if (licenseSafetyRatingCombined.includes('A')) {
    return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.A;
  }

  if (licenseSafetyRatingCombined.includes('P')) {
    return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.P;
  }

  if (licenseSafetyRatingCombined.includes('PWC')) {
    return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.PWC;
  }

  return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.R;
  // switch (licenseSafetyRatingCombined) {
  //   case :
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.R;
  //   case 1:
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.D;
  //   case 2:
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.C;
  //   case 3:
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.B;
  //   case 4:
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.A;
  //   case 5:
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.P;
  //   case 6:
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.PWC;
  //   default:
  //     return COLOR_CONSTANTS.LICENSE_CLASS_COLORS.R;
  // }
};

export const determineDriverRelativeColor = (
  userLap: number,
  driverLap: number,
  relativeTime: number,
) => {
  const lapDifference = Math.abs(userLap - driverLap);
  const isSameLapAsUser = userLap === driverLap || lapDifference === 1;

  const isDriverBeingLapped =
    (userLap > driverLap && lapDifference >= 2) ||
    (userLap > driverLap && lapDifference === 1 && relativeTime > 0);

  const isUserBeingLapped =
    (driverLap > userLap && lapDifference >= 2) ||
    (driverLap > userLap && lapDifference === 1 && relativeTime < 0);

  if (isDriverBeingLapped) {
    return COLOR_CONSTANTS.RELATIVE_COLORS.USER_LAPPING_DRIVER_COLOR;
  }

  if (isUserBeingLapped) {
    return COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_LAPPING_USER_COLOR;
  }

  if (isSameLapAsUser) {
    return COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_SAME_LAP_AS_USER_COLOR;
  }

  return COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_SAME_LAP_AS_USER_COLOR;
};
