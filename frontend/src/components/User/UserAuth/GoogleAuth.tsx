import { GoogleLogin} from "@react-oauth/google"
import { Button } from "@mui/material";
import { useGoogleLoginMutation } from "../../../redux/Features/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../../redux/Features/reducers/userAuthSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () =>{
  const [loginWithGoogle] = useGoogleLoginMutation()
 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loginHandler = async(credential : string) =>{
    console.log("hello");
    console.log(credential);
    
      try {
        const res = await loginWithGoogle({credential}).unwrap()
        if(res.status === 'success'){
        dispatch(setUserCredentials({userName:res.userName,userToken:res.token}))
        navigate('/')
        }  
      } catch (error) {
        console.log(error);
      }

  }
    return(
      <Button variant='contained' disableRipple disableElevation> 
      <GoogleLogin width="700"
      theme="outline"
      size="large"
      shape="rectangular"
      onSuccess={
        (credentials)=>{
          if(credentials.credential) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            loginHandler(credentials.credential.toString())
          }
        }
      }
     onError={()=>{
      console.log('Login Failed')
     }}
   /></Button>

    )

}

export default GoogleAuth