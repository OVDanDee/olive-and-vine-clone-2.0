import type { SxProps, Theme } from "@mui/material";

const centerInputSx: SxProps<Theme> = {
  "& .MuiInputBase-input": { textAlign: "left" },
};

export const subscribeNoRadiusSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "& fieldset": { borderColor: "rgba(17, 27, 18, 0.3)", borderRadius: 0 },
    "&:hover fieldset": { borderColor: "rgba(17, 27, 18, 0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#627F38" },
    "&.Mui-error fieldset": { borderColor: "#627F38" },
  },
  "& .MuiInputLabel-root": { "&.Mui-focused": { color: "#627F38" } },
  "& .MuiInputLabel-root.Mui-error": { color: "#627F38" },
};

export const subscribeTitleSx: SxProps<Theme> = {
  ...centerInputSx,
  "& .MuiOutlinedInput-root": {
    fontSize: "16px",
    borderRadius: 0,
    "&.Mui-focused fieldset": { borderColor: "#627F38" },
    "& fieldset": { borderRadius: 0 },
    "&.Mui-error fieldset": { borderColor: "#627F38" },
  },
  "& .MuiInputLabel-root.Mui-error": { color: "#627F38" },
  "& .MuiSelect-select": { color: "rgba(17, 27, 18, 0.5)" },
};
