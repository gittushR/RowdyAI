import { Typography } from "@mui/material";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="openai"
          width={"30px"}
          className="image-inverted"
        />
      </Link>
      <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            mr: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 20px #000",
          }}
        >
          <span style={{ fontSize: "20px" }}>ROWDY</span>-AI
        </Typography>
      </Link>
    </div>
  );
};

export default Logo;
