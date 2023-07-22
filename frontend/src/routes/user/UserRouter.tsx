import UserLogin from '../../pages/user/Login'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/user/Home'
import UserRegister from '../../pages/user/Register'

const UserRouter = ()=>{
    return(
        <>
        <Routes>
            <Route path='/register' element={<UserRegister/>} />
            <Route path='/login' element={<UserLogin/>} />
            <Route path='/' element={<Home/>} />
        </Routes>
        </>
    )

}
export  default UserRouter