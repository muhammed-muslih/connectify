import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

const data = localStorage.getItem('adminToken') 
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const parsedToken :string  = data? JSON.parse(data) : ''



const initialState = {
    token : parsedToken,
}


const adminAuthSlice = createSlice({
    name : 'adminAuth',
    initialState,
    reducers : {
        setAdminCredentials : (state ,action :PayloadAction<{adminToken : string}>) => {

            const adminToken = action.payload.adminToken
            localStorage.setItem('adminToken', JSON.stringify(adminToken))
            state.token = adminToken

        },
        logoutAdmin : (state) => {
            state.token  = ''
            localStorage.removeItem('adminToken')
        }
    }
})

export default adminAuthSlice.reducer
export const {setAdminCredentials,logoutAdmin} = adminAuthSlice.actions
export const selectAdminToken = (state:RootState) =>state.adminAuth.token
