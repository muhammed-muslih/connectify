import { Box } from "@mui/material";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@emotion/react";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ labels, usersPerMonth }: { labels: string[]; usersPerMonth: number[]|undefined}) => {
  const theme = useTheme()
  const datas = {
    labels,
    datasets: [
      {
        label: "no of users",
        data:usersPerMonth,
        backgroundColor: 'aqua',
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 20,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 20,
            weight: "bold",
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 20,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <Box sx={{ pt: 8, pl: 5}}>
      <Bar data={datas} options={options} />
    </Box>
  );
};

export default BarChart;
