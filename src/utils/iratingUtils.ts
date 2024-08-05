export const shortenIrating = (irating: number) => {
  return irating >= 1000 ? `${(irating / 1000).toFixed(1)}k` : ` ${irating}`;
};
