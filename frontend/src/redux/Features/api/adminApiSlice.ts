import { apiSlice } from "./apiSlice";
import { UsersResInterface } from "../../../types/UserInterfaces";
import { BasicReponse,UserDataAdminDashBoardInterface,PostsDataAdminDashBoardInterface} from "../../../types/ResponseInterface";
import {AllPostResInterface } from "../../../types/PostInterfaces";


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({

        getAllUsers : builder.query<UsersResInterface ,void>({
            query : () => '/admin/get-all-users',
            providesTags:['user']
        }),

        blockAndUnblock : builder.mutation<BasicReponse,{userId:string}>({
            query : (userId) => ({
                url :'/admin/block-unblock-user',
                method: 'PATCH',
                body:userId,
            }),
            invalidatesTags : ['user']

        }),

        getPosts : builder.query<AllPostResInterface,void>({
            query : () =>({
                url:'/admin/get-all-posts',
            }),
            providesTags:['post','adminpost','removePost']
        }),

        removePost : builder.mutation<BasicReponse,{userId:string,postId:string}>({
            query:({postId,userId}) =>({
                url:'/admin/delete-post',
                method:'DELETE',
                body:{postId,userId}
            }),
            invalidatesTags:['removePost']

        }),

        getDashBoardPostData : builder.query<UserDataAdminDashBoardInterface,void>({
            query:() =>'/admin/get-dashboard-users-data',
            providesTags:['user']

        }),

        getDashBoardUserData : builder.query<PostsDataAdminDashBoardInterface,void>({
            query:() =>'/admin/get-dashboard-posts-data',
            providesTags:['post',"removePost"]
        })

    })
})

export const {
    useGetAllUsersQuery,
    useBlockAndUnblockMutation,
    useGetPostsQuery,
    useRemovePostMutation,
    useGetDashBoardPostDataQuery,
    useGetDashBoardUserDataQuery
} = adminApiSlice