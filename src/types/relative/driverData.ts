export interface IRelativeDriverData {
  position: number;
  carNumber: string;
  carClass: string;
  driverName: string;
  licenseSafetyRatingCombined: string;
  irating: number;
  iratingDiff: number;
  relativeTime: number;
  carIdx: number;
  currentLap: number;
  lapsCompleted: number;
  isInPit: boolean;
  isDriverOffTrack: boolean;
  carRelativeSpeed: number;
}
