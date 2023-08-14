import { apiSlice } from "./apiSlice";
import { AllPostResInterface,PostAddResInterface ,GetPostInterface,CommetAddInterface} from "../../../types/PostInterfaces";
import { BasicReponse } from "../../../types/ResponseInterface";


export const postSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createPost : builder.mutation<PostAddResInterface,any>({
            query : ({postData}) =>({
                url:'/post/add-post',
                method : 'POST',
                body : postData
            }),
            invalidatesTags : ['post']
        }),

        getAllPosts : builder.query<AllPostResInterface,void>({
            query : () => '/post',
            providesTags:['post','user']
        }),

        getUserPosts : builder.query<GetPostInterface,{id:string|undefined}>({
            query: ({id}) =>`/post/user-posts/${id}`,
            providesTags:['post','user']
        }),

        likeorDislike : builder.mutation<PostAddResInterface,any>({
            query : (postId) => ({
                url:'/post/post-like',
                method: 'POST',
                body:postId
            }),
            invalidatesTags:['post']

        }),

        addComment : builder.mutation<CommetAddInterface,{postId:string|undefined,text:string|undefined}>({
            query : ({text,postId}) => ({
                url:`/post/comment/${postId}`,
                method: 'POST',
                body:{text}
            }),
            invalidatesTags:['post','user']
        }),

        addReplyComment : builder.mutation<CommetAddInterface,{postId:string|undefined,text:string,commentId:string}>({
            query : ({postId,text,commentId}) => ({
                url:`/post/comment/${postId}/reply/${commentId}`,
                method:'POST',
                body:{text}
            }),
            invalidatesTags:['post','user']
        }),

        reportPost : builder.mutation<BasicReponse,{postId:string|undefined,text:string}>({
            query : ({postId,text}) => ({
                url:`/post/report/${postId}`,
                method:'PATCH',
                body:{text}
            }),
            invalidatesTags:['post']
          
        }),

        editPost : builder.mutation<BasicReponse,{postId:string|undefined,description:string|undefined}>({
            query : ({postId,description}) => ({
                url:`/post/edit/${postId}`,
                method:'PATCH',
                body:{description}

            }),
            invalidatesTags:['post']
        }),
        
        deletePost : builder.mutation<BasicReponse,{postId:string|undefined}>({
            query : ({postId}) => ({
                url:`/post/delete/${postId}`,
                method:'DELETE'
            }),
            invalidatesTags:['post']
        }),
        
    })
})

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetUserPostsQuery,
    useLikeorDislikeMutation,
    useAddCommentMutation,
    useAddReplyCommentMutation,
    useReportPostMutation,
    useEditPostMutation,
    useDeletePostMutation,
} = postSlice