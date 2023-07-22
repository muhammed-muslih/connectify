import mongoose ,{Schema, model} from 'mongoose';

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
        }
    },
    {
         // automatically includes  created and updated time fields
        timestamps:true

    }
)

const User = model('User',userSchema,'users')
export default User