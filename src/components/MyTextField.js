import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "&.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "yellow",
    },
  },
});

export { MyTextField };
