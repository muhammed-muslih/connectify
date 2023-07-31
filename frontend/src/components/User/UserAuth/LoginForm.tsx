import React from 'react';
import {Stack,Box,Divider,Typography,TextField,Button,InputAdornment,IconButton} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik ,FormikHelpers} from 'formik';
import *as yup from 'yup'
import { UserLoginInterface } from '../../../types/UserAuthInterface';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { useUserLoginMutation } from '../../../redux/Features/api/authApiSlice';
import { useDispatch } from 'react-redux';
import { setUserCredentials } from '../../../redux/Features/reducers/userAuthSlice';
import { useTheme } from '@mui/material/styles';

import GoogleAuth from './GoogleAuth';


const schema = yup.object().shape({
    userName:yup.string().required('please enter user name ')
    .min(3,'user name must be atleast 3 characters'),
    password:yup.string().required('please enter password ')
    .min(5,"Password must be atleast 5 characters")
    .max(15,'Password must be less than 15 characters')
})



const LoginForm : React.FC = () =>{

    const theme = useTheme();
    const [loginError,setLoginError] =useState('')
    const [loginUser,{isLoading}] = useUserLoginMutation()
    const dispatch = useDispatch()
    const submitHandler = async(values : UserLoginInterface,actions : FormikHelpers<UserLoginInterface>) =>{
        if(!isLoading){
            try {
                const res = await loginUser(values).unwrap()
                if(res.status === 'success'){
                    dispatch(setUserCredentials({ userName: values.userName, userToken: res.token,id:res._id}))
                    actions.resetForm()
                } 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error :any) {
                setLoginError(error.data.message)
            }
        }
    }
  
    const   initialValues : UserLoginInterface= {
             userName : '',
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
                }}>Log In</Typography>
            <form onSubmit={handleSubmit}>  
               <Stack direction={'column'} spacing={4} sx={{my:5}}>
                  <TextField sx={{color:theme.palette.primary.light}}
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.userName&&touched.userName? true:false}
                  helperText={errors.userName&&touched.userName?errors.userName:''}
                   name='userName' label='userName' size='medium' variant='filled' fullWidth />

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

                  <Typography variant='body1' color={theme.palette.primary.light}> Don't have an account? 
                  <Link to='/register' style={{textDecoration:'none'}}>Sign Up</Link>
                  </Typography>
                  <Typography variant='body1' color={'error'}> {loginError} </Typography>
                 
                  <GoogleAuth/>
               </Stack>
            </form> 
            </Box>
            </Stack>
           
        </Stack> 
    )
}

export default LoginForm