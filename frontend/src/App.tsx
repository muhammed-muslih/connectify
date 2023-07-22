import { BrowserRouter , Routes, Route } from 'react-router-dom';
import UserRouter from './routes/user/UserRouter';
import AdminRouter from './routes/admin/AdminRouter';
import './App.css'


const App = ()=>{
  return(
   <BrowserRouter>
   <Routes>
    <Route path='/*' element={<UserRouter/>}/>
    <Route path='/admin/*' element={<AdminRouter/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
