/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { RelativeTableRow } from './row';
import styles from './table.module.css';
import { IRelativeDriverData } from '../../../types/relative';

export function RelativeTable(props: {
  driverData: IRelativeDriverData[];
  userCarIdx: number;
  userCurrentLap: number;
  isRaceSession: boolean;
}) {
  useEffect(() => {
    const elm = document.getElementById(props.userCarIdx.toString());
    elm?.scrollIntoView({ block: 'center' });
  }, [props.driverData]);

  const handleResize = () => {
    const elm = document.getElementById(props.userCarIdx.toString());
    elm?.scrollIntoView({ block: 'center' });
  };
  const debounce = (fn: any, delay: any) => {
    let timerId: any;
    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };
  window.addEventListener('resize', debounce(handleResize, 5));

  return (
    <div className={styles.relativeTableWrapper}>
      <table className={styles.relativeTable}>
        <tbody>
          {props.driverData.map((d) => {
            return (
              <RelativeTableRow
                key={d.driverName}
                driverData={d}
                userData={{
                  userCarIdx: props.userCarIdx,
                  userCurrentLap: props.userCurrentLap,
                }}
                sessionData={{ isRaceSession: props.isRaceSession }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
