import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

export const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      //   inputProps={{
      //     style: {
      //       width: "400px",
      //       borderRadius: 10,
      //       fontSize: 20,
      //       color: "white",
      //     },
      //   }}
      sx={{
        width: "500px",
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2e2e2e",
            borderWidth: "2px",
            borderRadius: 10,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              borderWidth: "3px",
            },
          },
          "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
          },
          "& .MuiInputLabel-outlined": {
            color: "#2e2e2e",
            fontWeight: "bold",
            "&.Mui-focused": {
              color: "white",
              fontWeight: "bold",
            },
          },
        },
      }}
      name={props.name}
      label={props.label}
      type={props.type}
    ></TextField>
  );
};
