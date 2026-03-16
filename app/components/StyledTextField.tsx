"use client";

import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField";

const commonSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "transparent",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "rgba(17, 27, 18, 0.3)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(17, 27, 18, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#627F38",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(17, 27, 18, 0.5)",
    "&.Mui-focused": {
      color: "#627F38",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px 20px",
    color: "#111B12",
  },
};

export default function StyledTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      sx={{ ...commonSx, ...props.sx }}
    />
  );
}
