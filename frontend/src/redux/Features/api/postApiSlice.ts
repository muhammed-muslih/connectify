import { apiSlice } from "./apiSlice";
import { AllPostResInterface,PostAddResInterface ,GetPostInterface,CommetAddInterface,ReplyCommentInterface} from "../../../types/PostInterfaces";
import { BasicReponse } from "../../../types/ResponseInterface";
import { GetSinglePostInterface } from "../../../types/PostInterfaces";


export const postSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createPost : builder.mutation<PostAddResInterface,any>({
            query : ({postData}) =>({
                url:'/post/add-post',
                method : 'POST',
                body : postData
            }),
            invalidatesTags : ['post','adminpost']
        }),

        getAllPosts : builder.query<AllPostResInterface,{page:number,limit:number}>({
            query : ({page,limit}) => `/post?p=${page}&l=${limit}`,
            providesTags:['post','user']
        }),

        getUserPosts : builder.query<GetPostInterface,{id:string|undefined}>({
            query: ({id}) =>`/post/user-posts/${id}`,
            providesTags:['post','user','singlepost']
        }),

        likeorDislike : builder.mutation<PostAddResInterface,any>({
            query : (postId) => ({
                url:'/post/post-like',
                method: 'POST',
                body:postId
            }),
            invalidatesTags:['post','singlepost','adminpost']

        }),

        addComment : builder.mutation<CommetAddInterface,{postId:string|undefined,text:string|undefined}>({
            query : ({text,postId}) => ({
                url:`/post/comment/${postId}`,
                method: 'POST',
                body:{text}
            }),
            invalidatesTags:['post','user','singlepost']
        }),

        addReplyComment : builder.mutation<ReplyCommentInterface,{postId:string|undefined,text:string,commentId:string}>({
            query : ({postId,text,commentId}) => ({
                url:`/post/comment/${postId}/reply/${commentId}`,
                method:'POST',
                body:{text}
            }),
            invalidatesTags:['post','user','singlepost']
        }),

        reportPost : builder.mutation<BasicReponse,{postId:string|undefined,text:string}>({
            query : ({postId,text}) => ({
                url:`/post/report/${postId}`,
                method:'PATCH',
                body:{text}
            }),
            invalidatesTags:['post','singlepost','adminpost']
        }),

        editPost : builder.mutation<BasicReponse,{postId:string|undefined,description:string|undefined}>({
            query : ({postId,description}) => ({
                url:`/post/edit/${postId}`,
                method:'PATCH',
                body:{description}

            }),
            invalidatesTags:['post','singlepost','adminpost']
        }),
        
        deletePost : builder.mutation<BasicReponse,{postId:string|undefined}>({
            query : ({postId}) => ({
                url:`/post/delete/${postId}`,
                method:'DELETE'
            }),
            invalidatesTags:['post','singlepost','adminpost']
        }),

        getSinglePostDetails : builder.query<GetSinglePostInterface,{postId:string}>({
            query: ({postId}) => `/post/${postId}`,
            providesTags:['post','singlepost']

        }),

        deleteComment : builder.mutation<BasicReponse,{postId:string,commentId:string}>({
            query : ({postId,commentId}) => ({
                url:  `/post/${postId}/delete/${commentId}`,
                method:'PUT'
            }),
            invalidatesTags:['post','singlepost']

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
    useGetSinglePostDetailsQuery,
    useDeleteCommentMutation,
    

} = postSlice