export interface RegisterResponseInt{
    readonly status:string,
    readonly message:string,
    readonly token:string
    readonly _id:string
    readonly profilePicture :string|undefined
    
 }

 export interface GoogleResponseInt {
    readonly status:string,
    readonly message:string,
    readonly token:string,
    readonly userName : string,
    readonly _id:string 

 }

 export interface BasicReponse {
   readonly status:string,
   readonly message:string,
 }

 export interface SavedPostResInt {
   readonly status:string,
   saved:[string]

 }

 export interface UpdateProfileInterface {
  readonly status:string,
  readonly message:string,
  readonly profilePiture?:string
 }



 



 

 
 