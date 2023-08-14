import { ObjectId } from "mongoose";

export interface UserInterface {
    _id: string;
    userName: string;
    email: string;
    password: string;
    isBlocked?: boolean;
    profilePicture?: string|undefined;
}

export interface UserRegisterInterface {
    name: string;
    userName: string;
    email: string;
    password?: string;
} 

export interface UserResInerface {
    _id: string,
    name?: string,
    userName: string,
    email: string,
    isGoogleUser?: false,
    profilePicture?: string
    followers?: [],
    followings?: [],
    saved?: [],
  }

  export interface UpdateUserInterface {
    userName?:string,
    bio?:string,
    profilePicture?:string,
    profilePicName?: string
    name?:string
  }



