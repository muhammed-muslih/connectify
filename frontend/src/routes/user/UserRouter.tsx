import UserLogin from "../../pages/user/Login";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/user/Home";
import UserRegister from "../../pages/user/Register";
import UserProfile from "../../pages/user/UserProfile";
import Message from "../../pages/user/Message";

const UserRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/message" element={<Message/>}/>
      </Routes>
    </>
  );
};
export default UserRouter;
