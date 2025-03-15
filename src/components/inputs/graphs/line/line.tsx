import { Chart as ChartJS, registerables, Chart } from 'chart.js';
import { useEffect, useRef } from 'react';
import ChartStreaming from 'chartjs-plugin-streaming';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import styles from './line.module.css';
import { IpcChannels } from '../../../../constants/ipcChannels';
import { ITelemetry } from '../../../../types/iracing';

Chart.register(ChartStreaming);
ChartJS.register(...registerables);
Chart.defaults.set('plugins.streaming', {
  duration: 3000,
});

const BRAKE_INPUT_LABEL = 'Brake Input Data';
const THROTTLE_INPUT_LABEL = 'Throttle Input Data';
const INPUT_FPS = 144;

export function InputLineGraph() {
  const throttleInput = useRef(0);
  const brakeInput = useRef(0);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      IpcChannels.IRACING_TELEMETRY_INFO,
      (telemetry: ITelemetry) => {
        throttleInput.current = telemetry.values.ThrottleRaw * 100;
        brakeInput.current = telemetry.values.BrakeRaw * 100;
      },
    );
  }, []);

  return (
    <div className={styles.inputsLineGraph}>
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            streaming: {
              frameRate: INPUT_FPS,
            },
          },
          scales: {
            x: {
              display: false,
              type: 'realtime',
              realtime: {
                delay: 0,
                refresh: 0,
                onRefresh: (chart: any) => {
                  chart.data.datasets.forEach((dataset: any) => {
                    const value =
                      dataset.label === BRAKE_INPUT_LABEL
                        ? brakeInput
                        : throttleInput;

                    dataset.data.push({
                      x: Date.now(),
                      y: value.current,
                    });
                  });
                },
              },
            },
            y: {
              display: false,
              min: 0,
              max: 100,
              beginAtZero: true,
            },
          },
        }}
        data={{
          datasets: [
            {
              fill: true,
              label: BRAKE_INPUT_LABEL,
              data: [],
              borderColor: 'rgb(233, 6, 0)',
              backgroundColor: 'rgb(233, 6, 0, .3)',
              pointRadius: 0,
              cubicInterpolationMode: 'monotone',
            },
            {
              fill: true,
              label: THROTTLE_INPUT_LABEL,
              data: [],
              borderColor: 'rgb(10, 183, 27)',
              backgroundColor: 'rgb(10, 183, 27, .3)',
              pointRadius: 0,
              cubicInterpolationMode: 'monotone',
            },
          ],
        }}
      />
    </div>
  );
}
