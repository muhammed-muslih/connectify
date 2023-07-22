/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import {Stack,Box,Divider,Typography,TextField,Button,InputAdornment,IconButton} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useFormik ,FormikHelpers} from 'formik';
import *as yup from 'yup'
import { AdminLoginInterface } from '../../../types/AdminAuthInterface';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { useAdminLoginMutation } from '../../../redux/Features/api/authApiSlice';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../../../redux/Features/reducers/adminAuthSlice';
import { useTheme } from '@mui/material/styles';



const schema = yup.object().shape({
    email:yup.string().required('please enter email ')
    .email('plase enter valid email'),
    password:yup.string().required('please enter password ')
    .min(5,"Password must be atleast 5 characters")
    .max(15,'Password must be less than 15 characters')
})



const LoginForm : React.FC = () =>{

    const theme = useTheme();
    const [loginError,setLoginError] =useState('')
    const [loginAdmin,{isLoading}] = useAdminLoginMutation()
    const dispatch = useDispatch()
    const submitHandler = async(values : AdminLoginInterface,actions : FormikHelpers<AdminLoginInterface>) =>{
        if(!isLoading){
            try {
                const res = await loginAdmin(values).unwrap()
                console.log(res,'admin');
                
                if(res.status === 'success'){
                    dispatch(setAdminCredentials({adminToken: res.token }))
                    actions.resetForm()
                } 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error :any) {
                setLoginError(error.data.message)
            }
        }
    }
  
    const   initialValues : AdminLoginInterface= {
             email : '',
             password : '',
            }

    const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
        initialValues,
        onSubmit:submitHandler ,
        validationSchema:schema,
    })

    const[showPassword,setShowPassword] = useState(false)
    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword)
    }

    
    return(
        <Stack sx={{alignItems:'center',
        my:{
            xs:5,
            sm:10,
            md:12,
            lg:14,
            xl:18,

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
                 <Box borderBottom={2} borderColor={theme.palette.primary.main} my={2}>
                <Typography variant='h3' sx={{
                fontWeight: 'bold',
                color:theme.palette.primary.light,
                mx:6,
                paddingBottom:2,
               }}
               > 
               <IconButton size="large"><Diversity2Icon sx={{fontSize:60,fontWeight:'bolder',color:theme.palette.primary.main}}/></IconButton>
               Connectify</Typography>
             </Box>

            <Box 
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
                    color:theme.palette.primary.main,
                }}>Admin Log In</Typography>
            <form onSubmit={handleSubmit}>  
               <Stack direction={'column'} spacing={4} sx={{my:5}}>
                  <TextField sx={{color:theme.palette.primary.light}}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email&&touched.email? true:false}
                  helperText={errors.email&&touched.email?errors.email:''}
                   name='email' label='email' type='email' size='medium' variant='filled' fullWidth />

                  <TextField  sx={{color:theme.palette.primary.light}}
                   value={values.password}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   error={errors.password&&touched.password? true:false}
                   helperText={errors.password&&touched.password?errors.password:''}
                   name='password' label='password' type={showPassword?'text' : 'password'} size='medium' variant='filled' fullWidth 
                  InputProps={{endAdornment:
                  <InputAdornment position='end'>
                    <IconButton
                     aria-label="toggle password visibility"
                     onClick={handleClickShowPassword}
                     >
                     {showPassword ? <VisibilityOff /> : <Visibility />}
                   </IconButton>
                  </InputAdornment>

                }}
                  />

                  <Button variant='contained' type='submit' size='large' sx={{
                    backgroundColor:theme.palette.primary.light,
                    '&:hover':{
                        backgroundColor:theme.palette.primary.main
                    }
                  }} disableRipple disableElevation>Log In</Button>

                  <Typography variant='body1' color={'error'}> {loginError} </Typography>
               </Stack>
           </form> 
            </Box>
            </Stack>
        </Stack> 
    )
}

export default LoginForm