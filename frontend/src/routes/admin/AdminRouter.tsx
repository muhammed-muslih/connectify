import { Routes,Route } from "react-router-dom";
import AdminLogin from "../../pages/admin/Login";
import DashBoard from "../../pages/admin/DashBoard";
import Users from "../../pages/admin/Users";

const AdminRouter = () =>{
    return (
        <>
        <Routes>
            <Route path="/login" element={<AdminLogin/>}/>
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/users" element={<Users/>}/>
        </Routes>
        </>
    )
}

export default AdminRouter