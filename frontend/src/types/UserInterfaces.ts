export interface UserInerface {
    _id: string,
    name?: string,
    userName: string,
    email?: string,
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

  export interface UpdateUserInterface {
    userName?:string,
    bio?:string,
    name?:string,
    profilePiture?:string
  }

  export interface ListInterface {
    _id?:string,
    userName?:string,
    profilePicture?:string
  }

  export interface FollowersAndFollowingsListInterface  {
    status:string,
    message:string,
    followers?:ListInterface[],
    followings?:ListInterface[]

  }