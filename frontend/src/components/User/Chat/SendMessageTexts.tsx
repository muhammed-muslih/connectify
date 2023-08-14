import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SendMessageText = ({ text ,time}: { text: string,time:string }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: 2, 
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "flex-end", 
          maxWidth: "50%", 
          ml: "auto", 
        }}
      >
        <Box
          sx={{
            borderRadius: "20px 30px 0px 20px",
            py: 1,
            px: 3,
            backgroundColor: theme.palette.primary.main,
            color: "white",
            width: "100%", 
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

export default SendMessageText;
