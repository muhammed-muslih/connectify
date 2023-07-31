import mongoose ,{Mongoose, Schema, model} from 'mongoose';

const userSchema = new Schema(
    {
        name :{
            type: String,
            required : [true,"please add name"],
        },
        userName :{
            type: String,
            required : [true,"please add userName"],
            unique : true
        },
        email :{
            type: String,
            required : [true,"please add email"],
            unique : true
        },
        password :{
            type: String,
        },
        isGoogleUser :{
            type: Boolean,
            default: false,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        bio :{
            type: String
        },
        followers: {
            type:[Schema.Types.ObjectId],
            ref:'User',
            default:[]
        },
        followings: {
            type:[Schema.Types.ObjectId],
            ref:'User',
            default:[]
        },
        saved :{
            type:[Schema.Types.ObjectId],
            ref:'Posts',
            default:[]
        }
    },
    {
         // automatically includes  created and updated time fields
        timestamps:true

    }
)

const User = model('User',userSchema,'users')
export default User