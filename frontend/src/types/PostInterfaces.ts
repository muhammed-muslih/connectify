import { UserInerface } from "./UserInterfaces"

export interface GetAllPostInterface {
    imageName:string,
    imageUrl:string,
    description?:string,
    likes?:[],
    delete: boolean,
    _id:string,
    date:string,
    userId:UserInerface
    comments?:[]
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
    postId?:string
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

    }[]
   }

   export interface CommetAddInterface {
    readonly status:string,
    readonly message:string,
  }
