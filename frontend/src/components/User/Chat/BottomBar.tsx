import { Box, Stack } from "@mui/material";
import "../NavBar/NavBar.css";
import { useTheme } from "@mui/material/styles";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { useCreateMessageMutation } from "../../../redux/Features/api/messageApiSlice";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { Users } from "../../../types/chatInterface";

const BottomBar = ({
  selectedChatId,
  setNewMsg,
  users,
  setSendMessage,
}: {
  selectedChatId: string;
  setNewMsg: React.Dispatch<React.SetStateAction<string | undefined>>;
  users: Users[] | undefined;
  setSendMessage: React.Dispatch<any>;
}) => {
  const theme = useTheme();
  const [newMessage, setNewMessage] = useState<string>("");
  const currentUserId = useSelector(selectUserId);
  const [createNewMessage, { isLoading }] = useCreateMessageMutation();

  const handleMessageCreate = async (newMessage: string) => {
    if (!isLoading && newMessage && selectedChatId) {
      setNewMsg(newMessage);
      const msg = {
        sender: currentUserId,
        content: newMessage,
        chatId: selectedChatId,
      };
      const receiverDtaa =
        users && users?.find((user) => user._id !== currentUserId);
      const receiverId = receiverDtaa?._id;
      setSendMessage({ ...msg, receiverId });
      try {
        const res = await createNewMessage({
          chatId: selectedChatId,
          content: newMessage,
        }).unwrap(); 
      } catch (error: any) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  };

  const handleInputChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };
  return (
    <Box
      sx={{
        position: "sticky",
        top: {
          lg: "90%",
          md: "85%",
          xs:'60%'
        },
        px: {
          xs:1,
          md:10

        },
      }}
    >
      <Toaster position={"top-right"} />
      <Stack
        direction={"row"}
        spacing={0}
        sx={{
          borderRadius: 8,
          border: "3px solid",
          borderColor: theme.palette.primary.light,
          backgroundColor: "white",
        }}
        alignItems={"center"}
        boxShadow={8}
        px={4}
        
      >
        <MapsUgcIcon sx={{ color: theme.palette.primary.light }} />
        <InputEmoji
          borderColor={"white"}
          borderRadius={0}
          placeholder="write your message here.........."
          fontSize={18}
          value={newMessage}
          onChange={handleInputChange}
          onEnter={handleMessageCreate}
          cleanOnEnter
        />
      </Stack>
    </Box>
  );
};

export default BottomBar;
