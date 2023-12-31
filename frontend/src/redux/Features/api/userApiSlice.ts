import { apiSlice } from "./apiSlice";
import { UsersResInterface,GetUserInterface,FollowersAndFollowingsListInterface } from "../../../types/UserInterfaces";
import { BasicReponse,SavedPostResInt,UpdateProfileInterface } from "../../../types/ResponseInterface";
import { GetAllSavedPostInterface } from "../../../types/PostInterfaces";
import { NotificationRes } from "../../../types/ResponseInterface";


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
            invalidatesTags : ['user','notification']
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
        }),

        getSavedPostDetails : builder.query<GetAllSavedPostInterface,void>({
            query : () => '/user/saved-post-details',
            providesTags:['post','user','saved']
        }),

        updateUserProfile : builder.mutation<UpdateProfileInterface,any>({
            query : ({updateData}) => ({
                url: '/user/update-profile',
                method:'PATCH',
                body : updateData
            }),
            invalidatesTags:['user','post']
        }),

        removeProfilePic : builder.mutation<BasicReponse,void>({
            query : () =>({
                url:'/user/remove-profile-pic',
                method:'PATCH',
            }),
            invalidatesTags:['user','post']
        }),

        getFollowersAndFollowingsList : builder.query<FollowersAndFollowingsListInterface,void>({
            query : () =>'/user/followers-followings-list',
            providesTags:['user']
        }),

        verifyUserPassword : builder.mutation<BasicReponse,{password:string}>({
            query: ({password}) => ({
                url: '/user/verify-password',
                method:'POST',
                body:{password}
            
            })
        }),

        changePassword : builder.mutation<BasicReponse,{password:string}>({
            query: ({password}) => ({
                url: '/user/update-password',
                method:'PUT',
                body:{password}
            })

        }),

        getNotifications : builder.query<NotificationRes,void>({
            query: () => '/notification',
            providesTags:['notification']
        }),

        markAsRead : builder.mutation<BasicReponse,void>({
            query: () => ({
                url:'/notification/mark-as-read',
                method:'POST',
            }),
            invalidatesTags:['notification']

        }),

        createVerifySubscription : builder.mutation<any,{plan:number}>({
            query: ({plan}) => ({
                url:'/user/create-verify-subscription',
                method:'POST',
                body: {plan}
            })
        }),

        verifyPayment :  builder.mutation<any,{sessionId:string}>({
            query: ({sessionId}) => ({
                url:'/user/verify-payment',
                method:'POST',
                body: {sessionId}
            }),
            invalidatesTags:['user','post']
        }),
    })
})

export const {
    useUserSearchMutation,
    useGetUserQuery,
    useFollowAndUnFollowMutation,
    useGetSavedPostsQuery,
    useSaveAndUnSavePostMutation,
    useGetSavedPostDetailsQuery,
    useUpdateUserProfileMutation,
    useRemoveProfilePicMutation,
    useGetFollowersAndFollowingsListQuery,
    useVerifyUserPasswordMutation,
    useChangePasswordMutation,
    useGetNotificationsQuery,
    useMarkAsReadMutation,
    useCreateVerifySubscriptionMutation,
    useVerifyPaymentMutation,
} = userApiSlice