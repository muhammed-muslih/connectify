import { ObjectId } from "mongoose";

export interface UserInterface {
    _id: string;
    userName: string;
    email: string;
    password: string;
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



