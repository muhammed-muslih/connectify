import { Box, Grid } from "@mui/material";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import DasBoardCard from "../Cards/DasBoardCard";
import { useState, useEffect } from "react";
import {
  useGetDashBoardUserDataQuery,
  useGetDashBoardPostDataQuery,
} from "../../../redux/Features/api/adminApiSlice";


const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const userStatusLabels = ["totalUsers", "activeUsers", "blockedUsers"];

const DashBoard = () => {
  const [usersPerMonth, setUsersPerMonth] = useState<number[]>();
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [blockedUsers, setBlockedUsers] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPosts,setTotalPosts] = useState<number>(0);
  const [postsPerDay,setPostsPerDay] = useState<number>(0);
  const [postsperMonth,setPostsperMonth] = useState<number>(0);
  const [postsperWeek,setPostsperWeek] = useState<number>(0);
  const { data: usersData, isLoading } = useGetDashBoardPostDataQuery();
  const { data: postsData, isLoading: postDataLoading } = useGetDashBoardUserDataQuery();
  
  useEffect(() => {
    const initialData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    usersData?.usersPerMonth.forEach((item) => {
      const monthIndex = item._id.month - 1;
      initialData[monthIndex] = item.count;
    });
    setUsersPerMonth(initialData);
  }, [usersData]);

  useEffect(() => {
    setActiveUsers(usersData?.usersStatistics.activeUsres ?? 0);
    setBlockedUsers(usersData?.usersStatistics.blockedUsers ?? 0);
    setTotalUsers(usersData?.usersStatistics.totalUsers ?? 0);
  }, [usersData]);

  useEffect(()=>{
    setTotalPosts(postsData?.posts.totalPosts??0)
    setPostsPerDay(postsData?.posts.postsToday??0)
    setPostsperWeek(postsData?.posts.postsThisWeek??0)
    setPostsperMonth(postsData?.posts.postsThisMonth??0)
  },[postsData])

  return (
    <Box sx={{ display: "flex", alignItems: "center", pt: 15 }}>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={6} xs={12}>
          <DasBoardCard  title={"todays posts"} count={postsPerDay}/>
        </Grid>
        <Grid item xl={3} lg={6} xs={12}>
          <DasBoardCard title={"this week posts"} count={postsperWeek} />
        </Grid>
        <Grid item xl={3} lg={6} xs={12}>
          <DasBoardCard title={"this month posts"} count={postsperMonth} />
        </Grid>
        <Grid item xl={3} lg={6} xs={12}>
          <DasBoardCard title={"total posts"}  count={totalPosts}/>
        </Grid>

        <Grid item lg={8} xs={12}>
          <BarChart labels={labels} usersPerMonth={usersPerMonth} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <PieChart
            activeUsers={activeUsers}
            blockedUsers={blockedUsers}
            totalUsers={totalUsers}
            userStatusLabels={userStatusLabels}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default DashBoard;
