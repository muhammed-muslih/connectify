import { apiSlice } from "./apiSlice";
import { UsersResInterface,GetUserInterface } from "../../../types/UserInterfaces";
import { BasicReponse,SavedPostResInt } from "../../../types/ResponseInterface";


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

        getSavedPosts :builder.query<SavedPostResInt,void> ({
            query : () => '/user/saved-post',
            providesTags : ['saved','post']
        }),

        saveAndUnSavePost : builder.mutation<BasicReponse,{postId:string | undefined}>({
            query : (postId) => ({
                url : '/user/save-unsave-post',
                method : 'POST',
                body: postId 
            }),
            invalidatesTags:['saved','post']
        })

    })
})

export const {
    useUserSearchMutation,
    useGetUserQuery,
    useFollowAndUnFollowMutation,
    useGetSavedPostsQuery,
    useSaveAndUnSavePostMutation
} = userApiSlice