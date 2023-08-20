import { Schema,model } from 'mongoose'

const notificationSchema = new Schema(
    {
        receiver:{
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        content: { 
            type: String, trim: true 
        },
        postId :{
            type: Schema.Types.ObjectId,
            ref:'Posts'
        },
        isRead:{
            type:Boolean,
            default: false,
        }
        
    },
    {
        timestamps: true

    }
)

const Notification = model('Notification',notificationSchema,'notification')
export default Notification