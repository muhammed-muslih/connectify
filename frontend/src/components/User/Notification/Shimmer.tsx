import { Box, Skeleton } from "@mui/material";

const Shimmer = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <Box sx={{mt:2}}>
        <Skeleton variant="rectangular" width={'100%'} height={60} key={item}/>
        </Box>
      ))}
    </>
  );
};
 export default Shimmer;