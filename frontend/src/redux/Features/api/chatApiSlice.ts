import { apiSlice } from "./apiSlice";
import { GetAllChatInterface, SingleChatInterface } from "../../../types/chatInterface";


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
        }),

        getSingleChat : builder.query<SingleChatInterface,{chatId:string}>({
            query: ({chatId}) => `/chat/${chatId}`,
        })
    })
})

export const {
    useGetAllChatsQuery,
    useCreateChatsMutation,
    useGetSingleChatQuery,
} = chatApiSlice