import { Box, Typography, Button } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useTheme } from "@mui/material/styles";
import { useCreateVerifySubscriptionMutation } from "../../../redux/Features/api/userApiSlice";


const SubScriptionCard = ({
  duration,
  amount,
  title,
  content,
}: {
  duration: string;
  amount: number;
  title: string;
  content: string;
}) => {
  const theme = useTheme();
  const [createsubscription,{isLoading,isError}] = useCreateVerifySubscriptionMutation()

  const handlePayment = async() => {
    if(!isLoading){
      try {
        const res : any = await createsubscription({plan:amount})
        console.log(res);
        
        if (!isError && res.data.session.url) {
          window.location = res.data.session.url;
        }
      } catch (error:any) {
        console.log(error.message,'error');
      }
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "white",
        py: 10,
        px: 5,
        borderRadius: 6,
        margin: "0 8px",
        [theme.breakpoints.down("lg")]: {
          margin: "8px 8px",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 10 }}>
        <VerifiedIcon sx={{ width: 200, height: 200 }} />
      </Box>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bolder" }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {content}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bolder" }}>
          Establish authenticity for just &#8377;{amount}.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: theme.palette.primary.main,
            fontWeight: "bolder",
            p: 2,
            px: 6,
            fontSize: "25px",
            '&:hover': {
              backgroundColor: 'white', 
            },
          }}
          onClick = {handlePayment}
        >
          &#8377;{amount}
        </Button>
      </Box>
    </Box>
  );
};

export default SubScriptionCard;
