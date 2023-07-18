import { BrowserRouter , Routes, Route } from 'react-router-dom';
import UserRouter from './routes/user/UserRouter';
import './App.css'


const App = ()=>{
  return(
   <BrowserRouter>
   <Routes>
    <Route path='/*' element={<UserRouter/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
