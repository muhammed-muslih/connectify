export interface ProfileProps {
    isUserPost: boolean;
    setUserPost: React.Dispatch<React.SetStateAction<boolean>>;
    isCurrentUser:boolean;
    setCurrentUser:React.Dispatch<React.SetStateAction<boolean>>
    userId?:string|undefined
  }

  // export interface ProfileProps {
  //   isUserPost: boolean;
  //   setUserPost: React.Dispatch<React.SetStateAction<boolean>>;
  //   isCurrentUser:boolean;
  //   setCurrentUser:React.Dispatch<React.SetStateAction<boolean>>
  //   profileName:string|undefined
  //   followers:string[]|undefined
  //   followings:string[]|undefined
  //   bio : string
  //   profilePicture : string|undefined
  //   userId?:string|undefined
  // }


  export interface PostPropsInterface {
    _id?:string
    userName?:string | undefined
    imageUrl?:string | undefined
    imageName?:string | undefined
    description?:string | undefined,
    profilePicture?: string | undefined,
    likes?:[],
    date?:Date | string|undefined
    comments?:[]
   }

    interface PostInterface {
    _id: string;
    userId?: string;
    imageName?: string;
    imageUrl?: string;
    likes?: string[];
  }

  export interface PostCardInterface {
    posts : PostInterface[] | undefined

  }

  
  
  