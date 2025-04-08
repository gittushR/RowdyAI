import { Typography, Box, Button } from "@mui/material";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import { MdOutlineLogin } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Loggin in!", { id: "login" });
      await auth?.login(email, password);
      toast.success("Logged in successfully!", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error(`Login failed. ${error} `, { id: "login" });
    }
  };
  //@ts-expect-error:"Relax TS this is the syntax"
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} ml={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="robo_bottle.png" alt="Robot" style={{ width: "600px", height:'600px' }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={60}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
          action=""
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput
              name="email"
              type="email"
              label="Email"
            ></CustomizedInput>
            <CustomizedInput
              name="password"
              type="password"
              label="Password"
            ></CustomizedInput>
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "200px",
                borderRadius: 10,
                bgcolor: "#00FFFC",
                fontWeight: "bold",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
                alignSelf: "center",
                color: "black",
              }}
              endIcon={<MdOutlineLogin />}
            >
              LOGIN
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
