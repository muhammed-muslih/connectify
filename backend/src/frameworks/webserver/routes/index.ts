import {Application} from "express"
import authRouter from "./auth"
import postRouter from "./post"
import userRouter from "./user"
import adminRouter from "./admin"
import chatRouter from "./chat"
import messageRouter from "./message"
import notificationRouter from "./notification"
import userAuthMid from '../middlewares/userAuthMid';
import adminAuthMid from '../middlewares/adminAuthMid'
import checkUserStatus from "../middlewares/checkUserStatus"

const routes = (app:Application)=>{
    app.use('/api/auth',authRouter())
    app.use('/api/post',userAuthMid,checkUserStatus,postRouter())
    app.use('/api/user',userAuthMid,checkUserStatus,userRouter())
    app.use('/api/admin',adminAuthMid,adminRouter())
    app.use('/api/chat',userAuthMid,checkUserStatus,chatRouter())
    app.use('/api/message',userAuthMid,checkUserStatus,messageRouter())
    app.use('/api/notification',userAuthMid,checkUserStatus,notificationRouter())
}

export default routes