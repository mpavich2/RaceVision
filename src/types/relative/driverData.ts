export interface IRelativeDriverData {
  position: number;
  carNumber: string;
  carClass: string;
  driverName: string;
  licenseSafetyRatingCombined: string;
  licenseColor: number;
  irating: number;
  iratingDiff: number;
  relativeTime: number;
  carIdx: number;
  currentLap: number;
  lapsCompleted: number;
  isInPit: boolean;
  isDriverOffTrack: boolean;
  carRelativeSpeed: number;
  carClassColor: string;
  didNotStart?: boolean;
  isDriverInLobby: boolean;
  sessionFlags: string[];
  isSpectator: boolean;
  isDriverOnTrack: boolean;
}
