import { z} from "zod"

export const userRegisterSchema = z.object({

    name:z.string({required_error:"please enter name"})
    .min(3,{message:"name must be atleast 3 characters"})
    .trim(),

    userName:z.string({required_error:"please enter user name"})
    .min(3,{message:"user name must be atleast 3 characters"})
    .trim(),

    email: z.string({required_error:"please enter valid email"})
    .trim().
    toLowerCase().
    email({message:"please provide valide email"})
    .refine(val => val.endsWith("@gmail.com"),{
        message:"email must be end with @gmail.com"
    }),

    password:z.string({required_error:"please provid password"})
    .trim()
    .min(5,{message:"Password must be atleast 5 characters"})
    .max(15,{message:"assword must be less than 15 characters"})

})
.strict()

export type UserRegisterType = z.infer<typeof userRegisterSchema>



export const userLoginSchema = z.object({

    userName:z.string({required_error:"please enter user name"})
    .min(3,{message:"user name must be atleast 3 characters"})
    .trim(),

    password:z.string({required_error:"please provid password"})
    .trim()
    .min(5,{message:"Password must be atleast 5 characters"})
    .max(15,{message:"assword must be less than 15 characters"})

})
.strict()

export type UserLoginType = z.infer<typeof userLoginSchema>




export const adminLoginSchema = z.object({
    email: z.string({required_error:"please enter valid email"})
    .trim().
    toLowerCase().
    email({message:"please provide valide email"})
    .refine(val => val.endsWith("@gmail.com"),{
        message:"email must be end with @gmail.com"
    }),

    password:z.string({required_error:"please provid password"})
    .trim()
    .min(5,{message:"Password must be atleast 5 characters"})
    .max(15,{message:"assword must be less than 15 characters"})
})
.strict()

export type AdminLoginType = z.infer<typeof adminLoginSchema>