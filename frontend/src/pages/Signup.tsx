import { Typography, Box, Button } from "@mui/material";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import { MdOutlineLogin } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing in!", { id: "signIn" });
      await auth?.signup(name,email, password);
      toast.success("Signed in successfully!", { id: "signIn" });
    } catch (error) {
      console.log(error);
      toast.error(`Account Creation failed. ${error} `, { id: "signIn" });
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
      <Box padding={8} mt={8}  ml={20} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={70}
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
              Sign Up
            </Typography>
            <CustomizedInput
              name="name"
              type="text"
              label="Username"
            ></CustomizedInput>
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
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
