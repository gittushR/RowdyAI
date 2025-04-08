import { Avatar, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import MarkdownRenderer from "./MarkdownRenderer";

const ChatItem = ({ content, role }: { content: string; role: string }) => {
  const auth = useAuth();
  let chatComponent = (
    <>
      <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
        <Avatar sx={{ ml: "0" }}>
          <img src="openai.png" alt="openai" width={"30px"}></img>
        </Avatar>
        <Box>
          <MarkdownRenderer content={content} />
        </Box>
      </Box>
    </>
  );
  if (role !== "assistant") {
    chatComponent = (
      <>
        <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my: 2 }}>
          <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
            {auth?.user?.name[0]}
          </Avatar>
          <Box>
            <MarkdownRenderer content={content} />
          </Box>
        </Box>
      </>
    );
  }
  return chatComponent;
};

export default ChatItem;
