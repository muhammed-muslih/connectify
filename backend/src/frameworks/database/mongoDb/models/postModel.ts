import mongoose ,{Schema, model} from 'mongoose';

const postSchema = new Schema (
    {
      userId : {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User'
      },

      imageName : String,

      imageUrl:String,

      description : String,

      date: { type: Date, default: Date.now },

      likes: {
        type: [Schema.Types.ObjectId],
        ref:'User',
        default: [],
      },

      comments:[
        {
          text: String,
          created : {type : Date, default: Date.now},
          postedBy :{type: Schema.Types.ObjectId,ref: 'User'},
          replies : [
            {
              text:String,
              created : {type : Date, default: Date.now},
              postedBy :{type: Schema.Types.ObjectId,ref: 'User'}, 
            }
          ]
        } 
      ],

      delete:{
        type:Boolean,
        default: false,
      },
      
      report:[
        {
          text: String,
          reportedBy:{type: Schema.Types.ObjectId,ref:'User'},
          created : {type : Date, default: Date.now},
        }
      ]
    }
)

const Posts = model('Posts',postSchema,'posts')
export default Posts

