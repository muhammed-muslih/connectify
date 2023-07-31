import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../../../redux/Features/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../../redux/Features/reducers/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {useTheme} from "@mui/material";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme()
  const [loginWithGoogle, { isLoading }] = useGoogleLoginMutation();

  const loginHandler = async (credential: string | undefined) => {
     if(credential){
      try {
        const res = await loginWithGoogle({ credential }).unwrap();
        if (res.status === "success") {
          dispatch(
            setUserCredentials({ userName: res.userName, userToken: res.token,id:res._id})
          );
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }

     } else {
      console.log('no cerdentials');
      
     }
  };

  return (
    <Button variant='contained' size="small" sx={{
      backgroundColor:theme.palette.primary.light,
      '&:hover':{
          backgroundColor:theme.palette.primary.main
      }
    }} disableRipple disableElevation>
    <GoogleLogin
      width="700px"
      theme="outline"
      size="large"
      shape="rectangular"
      onSuccess={(credentialResponse : GoogleCredentialResponse) => {
        loginHandler(credentialResponse.credential);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
    </Button>
  );
  
};

export default GoogleAuth;
