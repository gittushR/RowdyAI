import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLinks from "./shared/NavigationLinks";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo></Logo>
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLinks
                bg="#00fffc"
                to="/chat"
                text="Go to Chat"
                textColor="black"
              />
              <NavigationLinks
                bg="#51538f"
                textColor="white"
                to="/"
                text="logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLinks
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLinks
                bg="#51538f"
                textColor="white"
                to="/signup"
                text="Sign In"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
