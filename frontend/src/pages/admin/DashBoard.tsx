import LeftBar from "../../components/Admin/LeftBar/LeftBar"
import { useSelector } from "react-redux"
import { selectAdminToken } from "../../redux/Features/reducers/adminAuthSlice"
import { Navigate } from "react-router-dom"


const DashBoard = () =>{
    const token = useSelector(selectAdminToken)

    if(token) {
        return (
            <LeftBar/>
        )

    }else {
        return(
            <Navigate to={'/admin/login'}/>

        )
    }
   
}

export default DashBoard