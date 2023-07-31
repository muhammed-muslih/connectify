/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BottomNavigation,BottomNavigationAction } from "@mui/material"
import { Home,Person,Favorite} from "@mui/icons-material"
import MessageIcon from '@mui/icons-material/Message';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useState } from "react"
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { useNavigate } from "react-router-dom";




  

const BottomNav = () =>{
    const userId = useSelector(selectUserId)
    const navigate = useNavigate()
    const [value,setValue] = useState(0)
    const profileNavigationHandler = () =>{
        navigate(`/profile/${userId}`)
    }

    return (
    <BottomNavigation sx={{width:'100%',position : 'fixed',bottom:0,color:'white',boxShadow: 10 }} value={value}
     onChange={(event,newValue)=>{setValue(newValue)}} 
     
     showLabels>
        <BottomNavigationAction  label='Home' icon={<Home/>} 
        onClick={()=>navigate('/')}
        />
        <BottomNavigationAction label='Notifications' icon={<Favorite/>} />
        <BottomNavigationAction label='Messages' icon={<MessageIcon/>} />
        <BottomNavigationAction label='Create' icon={<AddBoxOutlinedIcon/>} />
        <BottomNavigationAction label='Profile' icon={<Person />} 
        onClick={()=>profileNavigationHandler()}
        />
   </BottomNavigation>
    )

}

export default BottomNav