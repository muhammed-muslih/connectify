import UserLogin from "../../pages/user/Login";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/user/Home";
import UserRegister from "../../pages/user/Register";
import UserProfile from "../../pages/user/UserProfile";
import Message from "../../pages/user/Message";
import Notification from "../../pages/user/Notification";
import NotFoundPage from "../../pages/404Page/404Page";

const UserRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/message" element={<Message/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default UserRouter;
