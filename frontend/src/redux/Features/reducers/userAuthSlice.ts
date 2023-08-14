import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";

const data = localStorage.getItem("userToken");
const parsedToken: string = data ? JSON.parse(data) : "";
const userProfilePic = localStorage.getItem('userProfilePic')
const parsedUserProfilePic: string = userProfilePic ? JSON.parse(userProfilePic) : "";


const initialState = {
  token: parsedToken,
  userName: "",
  id: "",
  userProfilePic: parsedUserProfilePic,
  chatId:''
  
};

const userAuthSlice = createSlice({
  name: "useAuth",
  initialState,
  reducers: {
    setUserCredentials: (
      state,
      action: PayloadAction<{ userName: string; userToken: string; id: string}>
    ) => {
      const { userName, userToken, id} = action.payload;
      localStorage.setItem("userToken", JSON.stringify(userToken));
      state.token = userToken,
      state.userName = userName, 
      state.id = id
    },
    setProfilePicture: (state, action: PayloadAction<{ profilePicture: string | undefined }>) => {
      const { profilePicture } = action.payload;
      localStorage.setItem("userProfilePic", JSON.stringify(profilePicture));
      state.userProfilePic = profilePicture??'';
    },
    removeProfilePicture: (state) => {
      state.userProfilePic ='';
      localStorage.removeItem('userProfilePic');
    },
    setSelectedChatId :(state,action: PayloadAction<{ chatId:string}>) =>{
      const { chatId } = action.payload;
      state.chatId = chatId;
    },
    logoutUser: (state) => {
      state.token = "";
      state.userName = "";
      state.userProfilePic = '',
      state.id = '',
      localStorage.removeItem("userToken");
    },
  },
});

export default userAuthSlice.reducer;
export type UserAuthState = typeof userAuthSlice.reducer;
export const { setUserCredentials, logoutUser,removeProfilePicture,setProfilePicture,setSelectedChatId} = userAuthSlice.actions;
export const selectUserToken = (state: RootState) => state.userAuth.token;
export const selectUserName = (state: RootState) => state.userAuth.userName;
export const selectUserId = (state: RootState) => state.userAuth.id;
export const selectUserProfilePic = (state : RootState) =>state.userAuth.userProfilePic
export const selectSelectedChatId = (state : RootState) => state.userAuth.chatId

