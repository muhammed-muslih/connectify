import UserRegister from '../../pages/user/Register'
import UserLogin from '../../pages/user/Login'
import { Route, Routes } from 'react-router-dom'

const UserRouter = ()=>{
    return(
        <>
        <Routes>
            <Route path='/register' element={<UserRegister/>} />
            <Route path='/login' element={<UserLogin/>} />
        </Routes>
        </>
    )

}
export  default UserRouter