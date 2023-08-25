import { Box } from "@mui/material";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);



const PieChart = ({activeUsers,blockedUsers,totalUsers,userStatusLabels}
:{activeUsers: number,blockedUsers: number,totalUsers: number,userStatusLabels: string[]}) => {
    const datas = {
        labels:userStatusLabels,
        datasets: [
          {
            data: [totalUsers, activeUsers, blockedUsers],
            backgroundColor: ["blue", "aqua", "yellow"],
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
      };
  return (
    <Box sx={{ pt: 8, pl: 5 }}>
      <Pie data={datas} options={options} />
    </Box>
  );
};

export default PieChart;
