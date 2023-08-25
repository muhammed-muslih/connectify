import {createApi,fetchBaseQuery} from  '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../url'


const baseQuery = fetchBaseQuery({
    baseUrl:BASE_URL,
    prepareHeaders : (headers, {getState}:{getState:any}) => {
        const userToken = getState()?.userAuth.token
        const adminToken = getState()?.adminAuth.token
        
        if(window.location.href.includes('admin')) {
            headers.set('authorization',`Bearer ${adminToken}`)
        }else {
            headers.set('authorization',`Bearer ${userToken}`)
        }
        return headers
    }
}) 

export const apiSlice = createApi({
    baseQuery,
    reducerPath:'api',
    tagTypes : ['user','admin','search','post','saved','message','chat','singlepost','adminpost','notification','removePost'],
    endpoints : builder => ({})                 
})

export type ApiState = ReturnType<typeof apiSlice.reducer>;