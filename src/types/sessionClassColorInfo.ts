export interface ISessionClassColorInfo {
  carClass: string;
  carRelativeSpeed: number;
  carClassColorsInfo: {
    HIGHLIGHT: string;
    DEFAULT: string;
  };
}

export interface ISessionClassColorInfoMap {
  [carRelativeSpeed: number]: {
    HIGHLIGHT: string;
    DEFAULT: string;
  };
}
