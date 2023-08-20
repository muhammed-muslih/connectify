import { SingleMessageInterface } from "./messageInterface";
export interface GetAllChatInterface {
  status: string;
  message: string;
  chats: {
    _id: string;
    users: Users[];
    createdAt: "string";
    updatedAt: "string";
    latestMessage?: {
      _id: string;
      content: string;
    };
  }[];
}

export interface Users {
  _id: string;
  userName: string;
  profilePicture?: string;
}

export interface GetSingleChatInterface {
  _id: string;
  users: Users[];
  createdAt: "string";
  updatedAt: "string";
  latestMessage?: {
    _id: string;
    content: string;
  };
}
