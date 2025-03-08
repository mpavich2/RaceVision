import { IRacingMapLayers } from '../iracing';
import { TrackDirection } from './trackDirection';

export interface TrackDrawing {
  [IRacingMapLayers.ACTIVE]: {
    inside: string;
    outside: string;
  };
  [IRacingMapLayers.START_FINISH]: {
    line?: string;
    arrow?: string;
    point?: { x?: number; y?: number; length?: number } | null;
    direction?: TrackDirection | null;
  };
  [IRacingMapLayers.TURNS]?: {
    x?: number;
    y?: number;
    content?: string;
  }[];
}
