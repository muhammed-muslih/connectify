import { apiSlice } from "./apiSlice";
import { UsersResInterface,GetUserInterface } from "../../../types/UserInterfaces";
import { BasicReponse } from "../../../types/ResponseInterface";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : builder =>({
        userSearch : builder.mutation<UsersResInterface,{searchValue:string | undefined}> ({
            query: searchValue =>({
                url : '/user/search',
                method:'POST',
                body: searchValue,

            }),
            invalidatesTags : ['search','user']
        }),

        getUser : builder.query<GetUserInterface,{id:string | undefined}> ({
            query : ({id}) => `/user/get-user/${id}`,
            providesTags:['user']
        }),
            
        followAndUnFollow : builder.mutation<BasicReponse,{followedUserId:string | undefined}>({
            query: ({followedUserId}) => ({
                url : `/user/${followedUserId}/follow`,
                method: 'POST',
            }),
            invalidatesTags : ['user']
        }),

    })
})

export const {
    useUserSearchMutation,
    useGetUserQuery,
    useFollowAndUnFollowMutation,
} = userApiSlice