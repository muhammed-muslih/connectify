import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../../App/store'

const data = localStorage.getItem('userToken') 
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const parsedToken :string  = data? JSON.parse(data) : ''
console.log(parsedToken);



const initialState = {
    token :parsedToken,
    userName :''
}

const userAuthSlice = createSlice({
    name:'useAuth',
    initialState,
    reducers : {
        setUserCredentials :(state,action:PayloadAction<{userName:string,userToken:string}>)=>{
            const {userName,userToken} = action.payload
            localStorage.setItem('userToken',JSON.stringify(userToken))
            state.token = userToken,
            state.userName = userName
        },
        logoutUser :(state) => {
            state.token = ''
            state.userName = ''
            localStorage.removeItem('userToken')
        }
    }

})

export default userAuthSlice.reducer
export const {setUserCredentials,logoutUser} = userAuthSlice.actions
export const selectUserToken = (state:RootState) => state.userAuth.token
export const selectUserName = (state:RootState) => state.userAuth.userName

