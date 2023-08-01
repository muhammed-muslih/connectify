import { apiSlice } from "./apiSlice";
import { UsersResInterface } from "../../../types/UserInterfaces";
import { BasicReponse } from "../../../types/ResponseInterface";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({

        getAllUsers : builder.query<UsersResInterface ,void>({
            query : () => '/admin/get-alluser',
            providesTags:['user']
        }),

        blockAndUnblock : builder.mutation<BasicReponse,{userId:string}>({
            query : (userId) => ({
                url :'/admin/block-unblock-user',
                method: 'PATCH',
                body:userId,
            }),
            invalidatesTags : ['user']

        })
    })
})

export const {
    useGetAllUsersQuery,
    useBlockAndUnblockMutation
} = adminApiSlice