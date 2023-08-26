import { Box, Skeleton } from "@mui/material";

const Shimmer = () => {
  return (
    <Box sx={{display:"flex"}}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={350}
        height={400}
        sx={{ml:2,
            display:{
                xs:"none",
                md:'block'
            }
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={350}
        height={400}
        sx={{ml:2,
            display:{
                xs:"none",
                md:'block'
            }
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={350}
        height={400}
        sx={{ml:2}}
      />
    </Box>
  );
};

export default Shimmer;
