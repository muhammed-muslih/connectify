/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { selectUserToken } from "../../redux/Features/reducers/userAuthSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegisterForm from "../../components/User/UserAuth/RegisterForm";

const Register = () => {
  const token = useSelector(selectUserToken);

  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return <RegisterForm />;
  }
};

export default Register;
