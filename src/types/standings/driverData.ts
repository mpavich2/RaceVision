export interface IStandingsDriverData {
  gapTime: number;
  position: number;
  carNumber: string;
  carClass: string;
  driverName: string;
  irating: number;
  carIdx: number;
  carClassColor: string;
  isSpectator: boolean;
  fastestLap?: number;
  lastLap: number;
  classRelativeSpeed: number;
  isDriverOffTrack: boolean;
  isDriverInPit: boolean;
}
