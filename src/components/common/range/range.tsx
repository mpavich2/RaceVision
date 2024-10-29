/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import styles from './range.module.css';

export function RangeSlider(props: {
  value: number;
  setValue: (newValue: number) => void;
  headerText: string;
}) {
  const thumbRef = useRef<any>(null);
  const rangeRef = useRef<any>(null);

  const rangeMax = 100; // Set the maximum value for the range

  const handleInput = (e: any) => {
    const val = parseInt(e.target.value, 10);
    props.setValue(val);

    if (thumbRef.current && rangeRef.current) {
      const thumbWidthPx = 60; // Updated thumb width
      const w = rangeRef.current.offsetWidth; // Width of the range input
      const xPX = (val * (w - thumbWidthPx)) / rangeMax; // Position in PX
      thumbRef.current.style.left = `${xPX}px`;
      thumbRef.current.setAttribute('data-val', `${val}`); // Show percentage

      // Update background gradient dynamically
      const percentage = (val / rangeMax) * 100;
      rangeRef.current.style.background = `linear-gradient(to right, #477bc6ff ${percentage}%, #aaa ${percentage}%)`;
    }
  };

  useEffect(() => {
    handleInput({ target: { value: props.value } }); // Calculate on load
    const handleResize = () => handleInput({ target: { value: props.value } });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [props.value]);

  return (
    <div className={styles.container}>
      <div className={styles.rangeHeader}>{props.headerText}</div>
      <div className={styles.rangeDiv}>
        <input
          type="range"
          className={styles.range}
          min={0}
          max={rangeMax}
          step={1}
          value={props.value}
          onInput={handleInput}
          ref={rangeRef}
        />
        <span className={styles.rangeThumb} ref={thumbRef}>
          %
        </span>
      </div>
    </div>
  );
}
