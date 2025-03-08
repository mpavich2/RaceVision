import fs from 'fs';
import { findDirection, findIntersectionPoint, getSvgDom } from '../svg-utils';
import { TrackDrawing } from '../../../src/types/trackMap';
import { IRacingMapLayers } from '../../../src/types/iracing';
import { ITrackInfo } from '../types';
import { TRACKS_PATH } from '../constants';

const WHITESPACE_REGEX = /\s/g;

const createActive = (pathData: string) => {
  const firstZ = pathData.toLocaleLowerCase().indexOf('z') + 1;
  const inside = pathData.slice(0, firstZ);
  const outside = pathData.slice(firstZ);

  return {
    inside,
    outside,
  };
};

const createStartFinish = (
  svg: SVGSVGElement,
  acc: TrackDrawing,
  trackId: number,
) => {
  const paths = svg.querySelectorAll('path');
  const line = paths?.[0]?.getAttribute('d')?.replace(WHITESPACE_REGEX, '');
  const arrow = paths?.[1]?.getAttribute('d')?.replace(WHITESPACE_REGEX, '');
  let flipLineArrow = false;
  let intersection = findIntersectionPoint(acc.active.inside, line || '');

  if (!intersection) {
    flipLineArrow = true;
    intersection = findIntersectionPoint(acc.active.inside, arrow || '');
  }
  return {
    line: flipLineArrow ? arrow : line,
    arrow: flipLineArrow ? line : arrow,
    point: intersection,
    direction: findDirection(trackId),
  };
};

const createTurns = (svg: SVGSVGElement) => {
  const texts = svg.querySelectorAll('text');
  const turns = Array.from(texts).map((text) => {
    const transform = text.getAttribute('transform');
    const groups = transform?.match(
      /(?:matrix\(1 0 0 1 |translate\()([\d.]+) ([\d.]+)/,
    );
    const x = groups?.[1] ? parseFloat(groups[1]) : 0;
    const y = groups?.[2] ? parseFloat(groups[2]) : 0;
    const content = text.textContent ?? undefined;
    return { x, y, content };
  });
  return turns;
};

function createTrackJson(track: ITrackInfo) {
  const order = Object.values(IRacingMapLayers);

  const json = fs
    .readdirSync(`${TRACKS_PATH}/${track.track_id}`)
    .sort(
      (a, b) =>
        order.indexOf(a.replace('.svg', '') as IRacingMapLayers) -
        order.indexOf(b.replace('.svg', '') as IRacingMapLayers),
    )
    .filter((file) => file.endsWith('.svg'))
    .map((file) => {
      const svgContent = fs.readFileSync(
        `${TRACKS_PATH}/${track.track_id}/${file}`,
        'utf8',
      );
      return { file, trackId: track.track_id, svgContent };
    })
    .reduce((acc, { file, trackId, svgContent }) => {
      const id = `${file.replace('.svg', '')}`;
      const svg = getSvgDom(svgContent);

      if (id === IRacingMapLayers.ACTIVE) {
        const path = svg.querySelector('path') as SVGPathElement | null;
        const pathData = path?.getAttribute('d')?.replace(WHITESPACE_REGEX, '');
        if (!pathData) {
          console.warn(`No path data for ${trackId}/${id}`);
          return acc;
        }

        acc[id] = createActive(pathData);
      }

      if (id === IRacingMapLayers.START_FINISH) {
        acc[id] = createStartFinish(svg, acc, trackId);
      }

      if (id === IRacingMapLayers.TURNS) {
        acc[id] = createTurns(svg);
      }

      // TODO: Add inactive, pit road, and background options

      return acc;
    }, {} as TrackDrawing);

  return json;
}

export const creatTrackJsonList = (
  tracks: string[],
  trackInfo: ITrackInfo[],
) => {
  const trackJson = tracks.reduce(
    (acc, trackId) => {
      if (!fs.lstatSync(`${TRACKS_PATH}/${trackId}`).isDirectory()) {
        return acc;
      }

      const track = trackInfo.find((t) => t.track_id === +trackId);
      if (!track) {
        console.error(`No track info found for ${trackId}`);
        return acc;
      }

      return {
        ...acc,
        [parseInt(trackId, 10)]: createTrackJson(track),
      };
    },
    {} as Record<number, TrackDrawing>,
  );

  return trackJson;
};
