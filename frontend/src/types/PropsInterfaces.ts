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
    comments?:[],
    saved?:string[],
    postUserId:string |undefined
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
    name: string,
    email: string,
    status: string,
    isBlocked?: boolean | undefined,
    joiningDate: string | undefined
    id: string
  }[] 
  tableHead : string[] 
} 

  
  
  