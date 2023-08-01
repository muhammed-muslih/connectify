import {Application} from "express"
import authRouter from "./auth"
import postRouter from "./post"
import userRouter from "./user"
import adminRouter from "./admin"
import userAuthMid from '../middlewares/userAuthMid';
import adminAuthMid from '../middlewares/adminAuthMid'



const routes = (app:Application)=>{
    app.use('/api/auth',authRouter())
    app.use('/api/post',userAuthMid,postRouter())
    app.use('/api/user',userAuthMid,userRouter())
    app.use('/api/admin',adminAuthMid,adminRouter())

}

export default routes