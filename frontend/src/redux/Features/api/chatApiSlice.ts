import { apiSlice } from "./apiSlice";
import { GetAllChatInterface } from "../../../types/chatInterface";


export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({

        getAllChats : builder.query<GetAllChatInterface,void>({
            query: ()=> '/chat',
            providesTags:['chat']
        }),

        createChats : builder.mutation<any,{userId:string|undefined}>({
            query : (userId) =>({
                url: '/chat',
                method: 'POST',
                body:userId 
            }),
            invalidatesTags:['chat','message']
        })
    })
})

export const {
    useGetAllChatsQuery,
    useCreateChatsMutation
} = chatApiSlice