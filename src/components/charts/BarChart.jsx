import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip
);

import { useRef } from "react";
import { useEffect } from "react";

export default function BarChart({ data }) {
  const chartRef = useRef(null); // Reference to the chart instance

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
  }, []);

  return (
    <div style={{ minHeight: 250 }}>
      <Bar
        ref={chartRef}
        key={Math.random(Date.now())}
        data={data}
        options={options}
      />
    </div>
  );
}
