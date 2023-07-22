import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/api/apiSlice";
import userAuthReducer from '.././Features/reducers/userAuthSlice'
import adminAuthReducer from '../Features/reducers/adminAuthSlice'



export const store = configureStore({
    reducer :{
        [apiSlice.reducerPath] : apiSlice.reducer,
        userAuth : userAuthReducer,
        adminAuth : adminAuthReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type State = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
