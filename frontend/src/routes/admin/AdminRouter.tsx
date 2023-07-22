import { Routes,Route } from "react-router-dom";
import AdminLogin from "../../pages/admin/Login";
import DashBoard from "../../pages/admin/DashBoard";

const AdminRouter = () =>{
    return (
        <>
        <Routes>
            <Route path="/login" element={<AdminLogin/>}/>
            <Route path="/" element={<DashBoard/>}/>
        </Routes>
        </>
    )
}

export default AdminRouter