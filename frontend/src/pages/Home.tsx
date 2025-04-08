import { Box } from "@mui/material";
import TypingAnimation from "../components/shared/TypingAnimation";
import Footer from "../components/Footer";
import HomeCard from "../components/HomeCard";

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnimation></TypingAnimation>
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: 2,
            my: 6,
          }}
        >
          <HomeCard title={"SIGN UP"} to="/signup">
            "This ain’t for the soft, the shy, or the maybe-laters. This is for
            the bold. The loud. The ones who ain’t afraid to throw hands with
            life. Sign up. Man up. Show up. <b>SIGN UP!!!</b>"
          </HomeCard>
          <HomeCard title={"LOG IN"} to="/login">
            "The world doesn’t care if you’re tired—so grind harder, get louder,
            and keep moving like a beast on fire. Fall? Get up. Bleed? Keep
            swinging. Lost? Walk it off. <b>LOG IN AGAIN !!!</b>"
          </HomeCard>
          {/* <img
            src="robot.png"
            alt="robot"
            style={{ width: "200px", margin: "auto" }}
          /> */}

          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "200px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px  #64F3D5",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default Home;
