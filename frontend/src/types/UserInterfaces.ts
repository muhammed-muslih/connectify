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
    createdAt: string
  }


  export interface UsersResInterface {
    readonly status:string,
    readonly message:string,
    readonly user:UserInerface[]
  }
 
  
  export interface GetUserInterface{
    readonly status:string,
    readonly message:string,
    user:UserInerface
 
  }