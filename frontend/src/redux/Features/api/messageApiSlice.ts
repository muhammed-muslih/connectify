import { apiSlice } from "./apiSlice";
import { GetMessagesInterface } from "../../../types/messageInterface";

export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) => ({

        getMessages :builder.query<GetMessagesInterface,{chatId:string|undefined}>({
            query : ({chatId}) => `/message/${chatId}`,
            providesTags:['message']
        }),

        createMessage : builder.mutation<any,{chatId:string,content:string}>({
            query :({chatId,content}) =>({
                url:'/message',
                method : 'POST',
                body:{chatId,content}
            }),
            invalidatesTags:['message','chat']
        })

    })
})

export const {
    useGetMessagesQuery,
    useCreateMessageMutation
} = messageApiSlice