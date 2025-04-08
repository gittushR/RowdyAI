import {
  Avatar,
  Box,
  Button,
  colors,
  IconButton,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatReq,
} from "../components/shared/helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

// const chatMessages = [
//   { role: "user", content: "Hey, how are you?" },
//   { role: "assistant", content: "I'm doing great! How can I help you today?" },
//   { role: "user", content: "Can you explain how an API works?" },
//   {
//     role: "assistant",
//     content:
//       "Sure! An API, or Application Programming Interface, allows different software systems to communicate with each other...",
//   },
//   { role: "user", content: "Thanks, that's helpful." },
//   {
//     role: "assistant",
//     content: "You're welcome! Let me know if you have more questions.",
//   },
// ];

type Message = {
  role: string;
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const currChat = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content: currChat };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatReq(currChat);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deleteChats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chat history cleared", { id: "deleteChats" });
    } catch (error) {
      console.error(error);
      toast.error(`Unable to clear chat history. ${error}`, {
        id: "deleteChats",
      });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadChats" });
      getUserChats()
        .then((data) => {
          console.log(data);
          setChatMessages([...data.chats]);
          toast.success("Successfully Loaded Chats", { id: "loadChats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error(`Failed to load the chats! ${err.Message}`, {
            id: "loadChats",
          });
        });
    }
  }, [auth]);
  //@ts-expect-error:"Relax TS this is the syntax"
  useEffect(() => {
    if (auth?.isLoggedIn === false) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto" }}>
            You are talking to a Rowdy ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", my: 4, p: 3 }}>
            Oh, so you LIKE getting roasted? Bro, you built different—different
            as in completely brain-dead. 💀 Don't share any personal
            information, I can make you regret this later !!!
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              mx: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: colors.red[300],
              ":hover": {
                bgcolor: colors.red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: 600,
          }}
        >
          BE ROWDY
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            mx: "auto",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            overflowY: "auto",
            mb: "20px",
          }}
        >
          {chatMessages.map((chat, ind) => (
            <ChatItem
              content={chat.content}
              role={chat.role}
              key={ind}
            ></ChatItem>
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            //padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
            paddingTop: "25px",
            paddingBottom: "25px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend></IoMdSend>
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
