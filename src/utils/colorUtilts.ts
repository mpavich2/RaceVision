export const darkenHexColor = (col: string, amt: number) => {
  let usePound = false;

  let strippedHex = col;
  if (col[0] === '#') {
    strippedHex = col.slice(1);
    usePound = true;
  }

  let R = parseInt(strippedHex.substring(0, 2), 16);
  let G = parseInt(strippedHex.substring(2, 4), 16);
  let B = parseInt(strippedHex.substring(4, 6), 16);

  // to make the colour less bright than the input
  // change the following three "+" symbols to "-"
  R += amt;
  G += amt;
  B += amt;

  if (R > 255) R = 255;
  else if (R < 0) R = 0;

  if (G > 255) G = 255;
  else if (G < 0) G = 0;

  if (B > 255) B = 255;
  else if (B < 0) B = 0;

  const RR =
    R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

  return (usePound ? '#' : '') + RR + GG + BB;
};
