import { apiSlice } from "./apiSlice";
import { RegisterResponseInt ,GoogleResponseInt} from "../../../types/ResponseInterface";
import { UserRegisterInterface,UserLoginInterface } from "../../../types/UserAuthInterface";
import { AdminLoginInterface } from "../../../types/AdminAuthInterface";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints : builder =>({
        userRegister : builder.mutation<RegisterResponseInt,UserRegisterInterface>({
            query : data =>({
                url :'auth/register',
                method:'POST',
                body :data,
            }),
            invalidatesTags:['user','post','chat','message']
        }),

        userLogin : builder.mutation<RegisterResponseInt,UserLoginInterface>({
            query : data => ({
                url :'auth/user-login',
                method:'POST',
                body :data
            }),
            invalidatesTags : ['user','post','chat','message','notification']
        }),

        adminLogin : builder.mutation<RegisterResponseInt,AdminLoginInterface>({
            query : data => ({
                url:'auth/admin-login',
                method:'POST',
                body :data,
            }),
            invalidatesTags : ['admin','post','user','adminpost','notification']
        }),
        
        googleLogin : builder.mutation<GoogleResponseInt,{credential: string}>({
            query : data => ({
                url:'auth/google-login',
                method:'POST',
                body :data,
            }),
            invalidatesTags : ['user','post','chat','message','notification']
        })
    })
})

export const {
    useUserRegisterMutation,
    useUserLoginMutation,
    useAdminLoginMutation,
    useGoogleLoginMutation
} = authApiSlice