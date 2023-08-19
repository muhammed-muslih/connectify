import { Box, Typography, Avatar, Skeleton } from "@mui/material";

function Shimmer() {
  return (
    <>
      <Box
        sx={{
          paddingLeft: {
            lg: "22%",
            md: "10%",
            sm: "0%",
            xs: "0%",
          },
          width: {
            lg: "600px",
            sm: "500px",
          },
          height: "700px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: "57%", height: "450px" }} />
        </Skeleton>
      </Box>
    </>
  );
}

export default Shimmer;
