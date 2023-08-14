import LoginForm from "../../components/User/UserAuth/LoginForm";
import { selectUserToken } from "../../redux/Features/reducers/userAuthSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const token = useSelector(selectUserToken);

  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return <LoginForm />;
  }
};
export default Login;
