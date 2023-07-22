import LoginForm from "../../components/Admin/AdminAuth/LoginForm"
import {selectAdminToken} from '../../redux/Features/reducers/adminAuthSlice'
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Login = () =>{

     const token = useSelector(selectAdminToken)

     if(token) {
        return (
            <Navigate to={'/admin'}/>
        )
     }else {
        return (
            <LoginForm/>
        )
     }

}

export default Login