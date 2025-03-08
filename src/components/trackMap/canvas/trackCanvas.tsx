/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useEffect, useMemo, useRef, useState } from 'react';
import tracks from '../../../assets/normalized/tracks.json';
import styles from './trackCanvas.module.css';
import {
  TrackDirection,
  TrackDrawing,
  TrackDriver,
} from '../../../types/trackMap';
import { IRacingMapLayers } from '../../../types/iracing';
import { COLOR_CONSTANTS } from '../../../constants/colorConstants';

const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';
const PATH_ELEMENT = 'path';

interface ITracks {
  [id: string]: TrackDrawing;
}

export function TrackCanvas(props: {
  trackId: number;
  drivers: TrackDriver[];
}) {
  const [positions, setPositions] = useState<
    Record<number, TrackDriver & { position: { x: number; y: number } }>
  >({});
  const [isReady, setIsReady] = useState(false);
  const trackDrawing = (tracks as ITracks)[props.trackId];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const line = useMemo(() => {
    if (!trackDrawing?.[IRacingMapLayers.ACTIVE]?.inside) return null;
    const svgPath = document.createElementNS(SVG_NAMESPACE_URI, PATH_ELEMENT);
    svgPath.setAttribute(
      'd',
      trackDrawing?.[IRacingMapLayers.ACTIVE]?.inside || '',
    );
    return svgPath;
  }, [trackDrawing?.[IRacingMapLayers.ACTIVE]?.inside]);

  useEffect(() => {
    if (!trackDrawing || !line || !props.drivers?.length) return;

    const direction = trackDrawing[IRacingMapLayers.START_FINISH]?.direction;
    const intersectionLength =
      trackDrawing[IRacingMapLayers.START_FINISH]?.point?.length || 0;
    const totalLength = line.getTotalLength() || 0;

    function updateCarPosition(percent: number) {
      const adjustedLength = (totalLength * percent) % totalLength;
      const length =
        direction === TrackDirection.ANTICLOCKWISE
          ? (intersectionLength + adjustedLength) % totalLength
          : (intersectionLength - adjustedLength + totalLength) % totalLength;
      const point = line?.getPointAtLength(length);
      return { x: point?.x || 0, y: point?.y || 0 };
    }

    const updatedPositions = props.drivers.reduce(
      (acc: any, { driver, progress, isPlayer }: any) => {
        const position = updateCarPosition(progress);
        return {
          ...acc,
          [driver.CarIdx]: { position, driver, isPlayer, progress },
        };
      },
      {} as Record<
        number,
        TrackDriver & { position: { x: number; y: number } }
      >,
    );

    setPositions(updatedPositions);
    setIsReady(true);
  }, [
    props.drivers,
    line,
    trackDrawing?.[IRacingMapLayers.ACTIVE].inside,
    trackDrawing?.[IRacingMapLayers.START_FINISH]?.direction,
    trackDrawing?.[IRacingMapLayers.START_FINISH]?.point?.length,
  ]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !isReady) {
      return;
    }

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const scale = window.innerWidth / 1920;
      canvas.width = window.innerWidth;
      canvas.height = 1080 * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [isReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !isReady || !line) {
      return;
    }

    const draw = () => {
      ctx.clearRect(0, 0, 1920, 1080);

      // Shadow
      // ctx.shadowColor = 'black';
      // ctx.shadowBlur = 2;
      // ctx.shadowOffsetX = 1;
      // ctx.shadowOffsetY = 1;

      const inside = new Path2D(trackDrawing.active.inside);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 20;
      ctx.stroke(inside);

      const startFinish = new Path2D(
        trackDrawing[IRacingMapLayers.START_FINISH].line,
      );
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'red';
      ctx.stroke(startFinish);

      trackDrawing[IRacingMapLayers.TURNS]?.forEach((turn) => {
        if (!turn.content || !turn.x || !turn.y) {
          return;
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.font = '2rem sans-serif';
        ctx.fillText(turn.content, turn.x, turn.y);
      });

      Object.values(positions)
        .sort((a, b) => Number(a.isPlayer) - Number(b.isPlayer))
        .forEach(({ driver, position, isPlayer }) => {
          ctx.fillStyle = isPlayer
            ? COLOR_CONSTANTS.RELATIVE_COLORS.DRIVER_USER_COLOR
            : `#${driver.CarClassColor.toString(16)}`;
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'black';
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(position.x, position.y, 40, 0, 2 * Math.PI);
          ctx.fill();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.font = 'bold 2.5rem sans-serif';
          ctx.fillText(driver.CarNumber, position.x, position.y);
        });
    };

    const animate = () => {
      draw();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (!animationFrameIdRef.current) return;
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [
    positions,
    trackDrawing?.[IRacingMapLayers.ACTIVE]?.inside,
    trackDrawing?.[IRacingMapLayers.START_FINISH]?.line,
    trackDrawing?.[IRacingMapLayers.TURNS],
    line,
    isReady,
  ]);

  if (!trackDrawing?.[IRacingMapLayers.ACTIVE]?.inside) {
    return <>Track map unavailable</>;
  }

  return (
    <>
      {!trackDrawing?.[IRacingMapLayers.START_FINISH]?.point && (
        <p>Track start point unavailable</p>
      )}
      <div className={styles.wrapper}>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          height="100%"
          width="100%"
        />
      </div>
    </>
  );
}
