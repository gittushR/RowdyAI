import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

//@ts-expect-error:'JUST SENDING SOME PROPS'
export default function HomeCard({ title, to, ...props }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleHomeButton = (to:string) => {
    if (auth?.isLoggedIn && auth.user) {
      navigate("/chat");
    } else {
      navigate(to);
    }
  };
  return (
    <Card
      sx={{
        width: "300px",
        margin: "auto",
        borderRadius: "20px",
        bgcolor: "white",
        boxShadow: "-1px -1px 25px  #64F3D5",
        marginBottom: 5,
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="nuclear.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "black", textAlign: "center", fontWeight: "900" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.children}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={() => handleHomeButton(to)}
          size="large"
          sx={{
            pb: "10px",
            bgcolor: "#00fffc",
            width: "60%",
            color: "black",
            fontWeight: 600,
          }}
        >
          {title}
        </Button>
      </CardActions>
    </Card>
  );
}
