import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const RecieveMessageTexts = ({ text ,time}: { text: string,time:string }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        mb: 2,
      }}
    >

    <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "flex-start", 
          maxWidth: "50%", 
          mr: "auto", 
        }}
      >
      <Box
        sx={{
          borderRadius: "30px 20px 20px 0px",
          border: "1px solid",
          py: 1,
          px: 3,
          maxWidth: "100%", // Limit the width of the message box
          backgroundColor:"white"
        }}
      >
        <Typography variant="h6">{text}</Typography>
      </Box>
      <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
          {time}
      </Typography>
    </Box>
    </Box>
  );
};
export default RecieveMessageTexts;
