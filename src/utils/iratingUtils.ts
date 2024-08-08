export const shortenIrating = (irating: number) => {
  if (irating < 1000) {
    return irating;
  }

  const item = 1e3;
  const result = irating / item;
  const roundedResult = Math.floor(result * 10) / 10;

  if (irating < 10000) {
    return `${roundedResult.toFixed(1)}k`;
  }

  return result.toFixed(1);
};
