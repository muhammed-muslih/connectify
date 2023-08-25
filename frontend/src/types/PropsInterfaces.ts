import { UserInerface } from "./UserInterfaces";
import { Socket } from "socket.io-client";
export interface ProfileProps {
    isUserPost: boolean;
    setUserPost: React.Dispatch<React.SetStateAction<boolean>>;
    isCurrentUser:boolean;
    setCurrentUser:React.Dispatch<React.SetStateAction<boolean>>
    userId?:string|undefined
    noOfPosts? : number
  }

  
  export interface PostPropsInterface {
    _id?:string
    userName?:string | undefined
    imageUrl?:string | undefined
    imageName?:string | undefined
    description?:string | undefined,
    profilePicture?: string | undefined,
    likes?:[],
    date?:Date | string|undefined
    comments?:{
      _id: string;
      created?: string;
      text: string;
      postedBy?: UserInerface;
      replies: {
          _id: string;
          created?: string;
          text: string;
          postedBy?: UserInerface;
      }[];
    }[],
    saved?:string[],
    postUserId:string |undefined
    singlePost?:boolean,
    setDelete: React.Dispatch<React.SetStateAction<boolean>>,
    setDeletedId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setIsEdited: React.Dispatch<React.SetStateAction<boolean>>,
    setEditedId: React.Dispatch<React.SetStateAction<string | undefined>>,
    setEditedText: React.Dispatch<React.SetStateAction<string | undefined>>,
    socket?: Socket
   }

    interface PostInterface {
    _id: string;
    userId?: string;
    imageName?: string;
    imageUrl?: string;
    likes?: string[];
  }

  export interface PostCardInterface {
    posts? : PostInterface[] | undefined

  }

export interface UserTableProps {
  tableRow : {
    UserName: string,
    name: string|undefined,
    email: string|undefined,
    status: string,
    isBlocked?: boolean | undefined,
    joiningDate: string | undefined
    id: string
  }[] 
  tableHead : string[] 
} 

export interface PostTableProps {
  tableRow : {
    userId: string,
    UserName: string,
    id: string,
    date: string,
    imageName:string,
    imageUrl:string,
    description?:string,
    likes?:[],
    report?:[],
    userProfilePicture?: string
  }[] 
  tableHead : string[] 
} 

  
  
  