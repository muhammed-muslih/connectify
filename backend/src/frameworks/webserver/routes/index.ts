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



const routes = (app:Application)=>{
    app.use('/api/auth',authRouter())
    app.use('/api/post',userAuthMid,postRouter())
    app.use('/api/user',userAuthMid,userRouter())
    app.use('/api/admin',adminAuthMid,adminRouter())
    app.use('/api/chat',userAuthMid,chatRouter())
    app.use('/api/message',userAuthMid,messageRouter())
    app.use('/api/notification',userAuthMid,notificationRouter())

}

export default routes