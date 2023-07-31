import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RootState } from '../../App/store'

const data = localStorage.getItem('userToken') 
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const parsedToken :string  = data? JSON.parse(data) : ''

const initialState = {
    token :parsedToken,
    userName :'',
    id:''
}

const userAuthSlice = createSlice({
    name:'useAuth',
    initialState,
    reducers : {
        setUserCredentials :(state,action:PayloadAction<{userName:string,userToken:string,id:string}>)=>{
            const {userName,userToken,id} = action.payload
            localStorage.setItem('userToken',JSON.stringify(userToken))
            state.token = userToken,
            state.userName = userName,
            state.id =id
        },
        logoutUser :(state) => {
            state.token = ''
            state.userName = ''
            localStorage.removeItem('userToken')
        }
    }

})

export default userAuthSlice.reducer
export type UserAuthState = typeof userAuthSlice.reducer
export const {setUserCredentials,logoutUser} = userAuthSlice.actions
export const selectUserToken = (state:RootState) => state.userAuth.token
export const selectUserName = (state:RootState) => state.userAuth.userName
export const selectUserId = (state:RootState) =>state.userAuth.id

