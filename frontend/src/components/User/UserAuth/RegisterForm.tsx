import {Stack,Box,Divider,Typography,TextField,Button} from '@mui/material'
import { blueGrey } from '@mui/material/colors';
const color = blueGrey[500];
const color1 = blueGrey[600];



const RegisterForm = () => {

    return(
        <Stack sx={{alignItems:'center',
        my:{
            xs:3,
            sm:8,
            md:10,
            lg:12,
            xl:16,

        }}} >
            <Stack display={'flex'} 
            divider = {<Divider orientation='vertical' flexItem />}
             sx={{boxShadow:{
                xs:0,
                sm:'5',
                },
                borderRadius: '16px',
                width:{
                xs:'100%',
                sm:'80%',
                md:'70%',
                lg:'60%',
                xl:'40%'
             }}}
             direction={'column'}
             >
                <Box borderBottom={2} borderColor={color1}>
                <Typography variant='h3' sx={{
                fontWeight: 'bold',
                color:color,
                mx:6,
                paddingBottom:2,
               }}> 
               <span style={{ fontWeight: 'bolder',
               fontFamily: 'revert-layer',
               fontSize: 90,
               color:color1
               }}>C</span>onnectify</Typography>
             </Box>

            <Box 
            //  height={'500px'}
            //  display="flex"
             flexDirection="column"
             alignItems="center"
             p={8}
             
             sx={{
                px:{
                  lg:16,
                  md:12,
                  sm:8,
                  xs:4
             }}}
            >

                <Typography variant='h4' sx={{
                    fontWeight: 'bold',
                    color:color1,
                }}>Sign Up</Typography>
            <form>  
               <Stack direction={'column'} spacing={4} sx={{my:5}}>
                  <TextField sx={{color:color}} label='name' size='medium' variant='filled' fullWidth />
                  <TextField sx={{color:color}} label='userName' size='medium' variant='filled' fullWidth />
                  <TextField  sx={{color:color}}label='email' type='email' size='medium' variant='filled' fullWidth />
                  <TextField  sx={{color:color}}label='password' type='password' size='medium' variant='filled' fullWidth />

                  <Button variant='contained'  size='large' sx={{
                    backgroundColor:color,
                    '&:hover':{
                        backgroundColor:color1
                    }
                  }} disableRipple disableElevation>sign up</Button>
               </Stack>
           </form> 
            </Box>
            </Stack>
             
        </Stack> 
    )
}

export default RegisterForm