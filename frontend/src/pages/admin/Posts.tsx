import { Box, Grid, Theme } from "@mui/material";
import LeftBar from "../../components/Admin/LeftBar/LeftBar";
import { useSelector } from "react-redux";
import { selectAdminToken } from "../../redux/Features/reducers/adminAuthSlice";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import NavBar from "../../components/User/NavBar/NavBar";
import PostTable from "../../components/Admin/Tables/PostTable";
import { useGetPostsQuery } from "../../redux/Features/api/adminApiSlice";
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

const Posts = () => {
  const classes = useStyles();
  const token = useSelector(selectAdminToken);
  const { data, isLoading,refetch } = useGetPostsQuery();
  useEffect(()=>{
    refetch()
  },[])

  function createData(
    UserName: string,
    imageUrl: string,
    imageName: string,
    description: string,
    date: string,
    id: string,
    likes?: [],
    report?: [],
    userProfilePicture?: string
  ) {
    return {
      UserName,
      imageUrl,
      imageName,
      description,
      date,
      id,
      likes,
      report,
      userProfilePicture
    };
  }

  const postDetails =
    data?.posts.map((post) =>
      createData(
        post.userId.userName,
        post.imageUrl,
        post.imageName,
        post.description ?? "",
        post.date.toString(),
        post._id,
        post?.likes,
        post?.report,
        post?.userId.profilePicture
      )
    ) || [];

  const tableHead = [
    "UserName",
    "Post",
    "Description",
    "Posted Date",
    "Total Likes",
    "Total Reports",
    "Delete",
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
            <PostTable tableRow={postDetails} tableHead={tableHead} />
          </Grid>
        </Grid>
        <Box className={classes.bottomDisplay}></Box>
      </Box>
    );
  } else {
    return <Navigate to={"/admin/login"} />;
  }
};

export default Posts;
