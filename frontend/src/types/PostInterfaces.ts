import { UserInerface } from "./UserInterfaces"

export interface GetAllPostInterface {
    imageName:string,
    imageUrl:string,
    description?:string,
    likes?:[],
    delete?: boolean,
    _id:string,
    date:string,
    userId:UserInerface
    comments?:[]
    report?:[]
   }
  
   export interface AllPostResInterface {
     readonly status?:string,
     readonly message?:string,
     readonly posts :GetAllPostInterface[]
   }

   export interface PostInterface {
    imageName:string,
    imageUrl:string,
    description?:string,
    likes?:[],
    delete: boolean,
    _id:string,
    date:string,
    userId:string
   }

   export interface PostAddResInterface {
    readonly status:string,
    readonly message:string,
    post?:PostInterface
   }

   export interface GetPostInterface  {
    readonly status:string,
    posts:PostInterface[]
   }

   export interface commentProps {
    postId?:string,
    profilePicture?: string | undefined
    comments?:{
      _id:string,
      created?:string,
      text:string
      postedBy?:UserInerface,
      replies:{
        _id:string,
        created?:string,
        text:string
       postedBy?:UserInerface,
      }[]

    }[],
    setDeleteCmntId:React.Dispatch<React.SetStateAction<string | undefined>>
    setIsDelete: React.Dispatch<React.SetStateAction<boolean>>,
    isDelete: boolean,
    isCommentUpdated: boolean,
    setCommentUpdated: React.Dispatch<React.SetStateAction<boolean>>
   }

   export interface CommetAddInterface {
    readonly status:string,
    readonly message:string,
    result?:{
      _id:string,
    created?:string,
    text:string
    postedBy:UserInerface
    replies:{
      _id:string,
      created?:string,
      text:string
     postedBy:UserInerface,
    }[]
  }[]
}

export interface ReplyInterface {
  _id:string,
  text:string,
  postedBy?:UserInerface
  created?:string

}

export interface ReplyCommentInterface {
   status:string,
   message:string,
    result?:{
      _id:string,
      text:string,
      postedBy:UserInerface|string,
      created:string
  }

}

  export interface GetAllSavedPostInterface {
    imageName:string,
    imageUrl:string,
    description?:string,
    likes?:[],
    delete: boolean,
    _id:string,
    date:string,
    userId?:string
    comments?:[],
    posts:UserInerface[]
   }

   export interface GetSinglePostInterface {
    status:string,
    message:string,
    post:GetAllPostInterface
    

   }
