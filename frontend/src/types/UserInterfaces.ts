export interface UserInerface {
    _id: string,
    name: string,
    userName: string,
    email: string,
    isGoogleUser?: false,
    profilePicture?: string
    followers?: [],
    followings?: [],
    saved?: [],
    bio?: string,
    createdAt: Date,
    isBlocked?:boolean
  }


  export interface UsersResInterface {
    readonly status:string,
    readonly message?:string,
    readonly users:UserInerface[]
  }
 
  
  export interface GetUserInterface{
    readonly status:string,
    readonly message:string,
    user:UserInerface
 
  }