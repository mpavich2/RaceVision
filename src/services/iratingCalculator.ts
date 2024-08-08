// Fields with names BR1, BS1, etc that are unreadable relate to the excel sheet
// I am unsure what they mean so naming them the same as cell in the sheet

import { IRelativeDriverData } from '../types/relative';

// https://docs.google.com/spreadsheets/d/1gydg3I1z3_Z0YcnP27kH6T94N23mkf4RAqdfiuBbRB0/edit?gid=1285997479#gid=1285997479
const roundNumberToDecimal = (value: number, decimalPlaces: number) => {
  const tenToN = 10 ** decimalPlaces;

  return Math.round((value + Number.EPSILON) * tenToN) / tenToN;
};

export const calculateExpectedIratingDiff = (
  drivers: IRelativeDriverData[],
) => {
  const driversSortByPos = drivers
    .sort(
      // eslint-disable-next-line radix
      (a, b) => a.position - b.position,
    )
    .filter((d) => d.position !== 0);

  const driverCount = driversSortByPos.length;
  const driversDnsCount = driversSortByPos.reduce(
    (sum, curr) => (curr.didNotStart ? sum + 1 : sum),
    0,
  );

  // unsure of naming
  const BR1 = 1600 / Math.log(2);
  const BR1rounded = roundNumberToDecimal(BR1, 2);

  const driversSofExponential = driversSortByPos.map((d) => {
    const expCalc = Math.exp(-d.irating / BR1rounded);

    return roundNumberToDecimal(expCalc, 4);
  });
  const driverSofExpSum = driversSofExponential.reduce(
    (total, curr) => total + curr,
    0,
  );

  const strengthOfField = BR1rounded * Math.log(driverCount / driverSofExpSum);

  // unsure of naming
  const probabilitiesDriverToBeatDriverN = driversSortByPos.map((d1) => {
    return driversSortByPos.map((d2) => {
      const top =
        (1 - Math.exp(-d1.irating / BR1rounded)) *
        Math.exp(-d2.irating / BR1rounded);
      const bottom =
        (1 - Math.exp(-d2.irating / BR1rounded)) *
          Math.exp(-d1.irating / BR1rounded) +
        (1 - Math.exp(-d1.irating / BR1rounded)) *
          Math.exp(-d2.irating / BR1rounded);
      const divided = top / bottom;

      return roundNumberToDecimal(divided, 2);
    });
  });

  const expectedDriverScores = driversSortByPos.map((d, index) => {
    const probabilitySum =
      probabilitiesDriverToBeatDriverN[index].reduce(
        (total, curr) => total + curr,
        0,
      ) - 0.5;

    return roundNumberToDecimal(probabilitySum, 2);
  });

  const driverErrorFactor = driversSortByPos.map((d, index) => {
    if (d.didNotStart) {
      return 0;
    }
    const position = index + 1;

    return ((driverCount - driversDnsCount / 2) / 2 - position) / 100;
  });

  // only count drivers that started
  const driversIratingDiff = driversSortByPos.map((d, index) => {
    const position = index + 1;
    const iratingDiff =
      ((driverCount -
        position -
        expectedDriverScores[index] -
        driverErrorFactor[index]) *
        200) /
      (driverCount - driversDnsCount);

    return {
      ...d,
      iratingDiff: roundNumberToDecimal(iratingDiff, 2),
    };
  });

  return { sof: strengthOfField, drivers: driversIratingDiff };
};
