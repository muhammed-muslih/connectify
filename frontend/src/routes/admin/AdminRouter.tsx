import { Routes,Route } from "react-router-dom";
import AdminLogin from "../../pages/admin/Login";
import DashBoard from "../../pages/admin/DashBoard";
import Users from "../../pages/admin/Users";
import Posts from "../../pages/admin/Posts";

const AdminRouter = () =>{
    return (
        <>
        <Routes>
            <Route path="/login" element={<AdminLogin/>}/>
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/posts" element={<Posts/>}/>
        </Routes>
        </>
    )
}

export default AdminRouter