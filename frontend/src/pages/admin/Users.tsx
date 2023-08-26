import { Box, Grid, Theme } from "@mui/material";
import LeftBar from "../../components/Admin/LeftBar/LeftBar";
import { useSelector } from "react-redux";
import { selectAdminToken } from "../../redux/Features/reducers/adminAuthSlice";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import NavBar from "../../components/User/NavBar/NavBar";
import UserTable from "../../components/Admin/Tables/UserTable";
import { useGetAllUsersQuery } from "../../redux/Features/api/adminApiSlice";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  displayManager: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  bottomDisplay: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  displayManager2: {
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));

const Users = () => {
  const classes = useStyles();
  const token = useSelector(selectAdminToken);
  const { data: users, isLoading ,refetch} = useGetAllUsersQuery();
  useEffect(()=>{
    refetch()
  },[])

  function createData(
    UserName: string,
    name: string | undefined,
    email: string| undefined,
    joiningDate: string,
    status: string,
    isBlocked: boolean | undefined,
    id: string
  ) {
    return { UserName, name, email, joiningDate, status, isBlocked, id };
  }

  const userDetails =
    users?.users.map((user) =>
      createData(
        user.userName,
        user.name,
        user.email,
        user.createdAt.toString(),
        user.isBlocked ? "blocked" : "active",
        user.isBlocked,
        user._id
      )
    ) || [];

  const tableHead = [
    "userName",
    "name",
    "email",
    "joiningDate",
    "staus",
    "block/unblock",
  ];

  if (token) {
    return (
      <Box>
        <NavBar admin />
        <Grid container>
          <Grid item md={3} className={classes.displayManager}>
            <LeftBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <UserTable tableRow={userDetails} tableHead={tableHead} />
          </Grid>
        </Grid>
        <Box className={classes.bottomDisplay}></Box>
      </Box>
    );
  } else {
    return <Navigate to={"/admin/login"} />;
  }
};

export default Users;
