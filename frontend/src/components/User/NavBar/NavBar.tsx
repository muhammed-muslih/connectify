import { AppBar, Toolbar ,Typography,IconButton,Avatar,Stack }from "@mui/material"
import Diversity2Icon from '@mui/icons-material/Diversity2';
import './NavBar.css'



const NavBar = () => {
    
    return (
        <AppBar position="fixed">
            <Toolbar className='nav'>
            <Typography variant='h4' sx={{
                fontWeight: 'bold',
                color:'white',
                mx:6,
                display:{
                    xs:'none',
                    md:'none',
                    lg:'block'
                }
               }}
               > 
               <IconButton size="large"><Diversity2Icon sx={{fontSize:50,fontWeight:'bolder',color:'white'}}/></IconButton>
               Connectify</Typography>

               <Typography variant='h5' sx={{
                fontWeight: 'bold',
                color:'white',
                fontSize:{
                    xs:20,
                    sm:26,
                    md:32,
                },
                mx:4,
                display:{
                    lg:'none'
                }
               }}
              
               > 
               <IconButton size="medium"><Diversity2Icon sx={{fontSize:{xs:32,sm:36,md:40},
                fontWeight:'bolder',color:'white'}}/></IconButton>
               Connectify</Typography>

               <Stack className="icon" spacing={2} direction={'row'}>
                <Avatar alt='profilePic' sx={{
                    width:{
                        lg:60,
                        sm:40,
                        md:50,
                        xs:30
                    },
                    height:{
                        lg:60,
                        sm:40,
                        md:50,
                        xs:30
                    }
                    }} 
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"/>
                <Typography sx={{
                    fontWeight:'bold',
                    fontSize:{
                        lg:18,
                        md:16,
                        sm:14,
                        xs:12
                    }
                    }}> userName</Typography>
               </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar