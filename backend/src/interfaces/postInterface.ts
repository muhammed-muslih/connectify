import { UserResInerface } from "./userInterfaces"
export interface PostResInterface {
    _id: string
    userId : string
    posts? :{
        imageName : string 
        description? : string,
        date: Date
    }[]
}

export interface NewPostInterface {
  description?: string;
  imageName?: string | undefined ;
  imageUrl?: string | undefined
}

export interface PostArrRespInterface {
    description?: string;
   imageName?: string | undefined ;
   _id?: string | undefined
   date?: Date
}

export interface CommentInterface {
    text: string
    created? : Date
    postedBy : string
}

export interface ReportPostInterface {
    text: string
    reportedBy : string
}

interface ReplyPostInterface {
    _id: string
    created: Date;
    text?: string;
    postedBy?: UserResInerface;
}

export interface CommentPostInterface {
    _id: string;
    created: Date;
    replies: ReplyPostInterface[];
    text?: string;
    postedBy?:UserResInerface ;
}