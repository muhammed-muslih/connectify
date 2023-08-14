import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SendMessageText from "./SendMessageTexts";
import RecieveMessageTexts from "./RecieveMessageTexts";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/Features/reducers/userAuthSlice";
import { SingleMessageInterface } from "../../../types/messageInterface";
import { format } from "timeago.js";
import { useEffect, useRef } from "react";

const MessageTexts = ({
  messages,
}: {
  messages: SingleMessageInterface[] | undefined;
}) => {
  const theme = useTheme();
  const currentUserId = useSelector(selectUserId);
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      ref={scroll}
      sx={{
        maxHeight: {
          xl: "calc(100vh - 36vh)",
          lg: "calc(100vh - 37vh)",
          md: "calc(100vh - 40vh)",
          xs:"calc(100vh - 40vh)",
        },
        overflowY: "scroll",
        mt: 2,
        p: 2,
        position: "relative",
      }}
    >
      {messages?.map((message, i) =>
        message.sender.toString() === currentUserId ? (
          <Box key={message.createdAt}>
            <SendMessageText
              text={message.content}
              time={format(message.createdAt)}
            />
          </Box>
        ) : (
          <Box key={message.createdAt}>
            <RecieveMessageTexts
              text={message.content}
              time={format(message.createdAt)}
            />
          </Box>
        )
      )}
    </Box>
  );
};
export default MessageTexts;
