import { PaletteMode } from "@mui/material";
import { createTheme as createMuiTheme } from "@mui/material/styles";
import { defaultTheme } from "react-admin";

export const createDefaultTheme = (mode: PaletteMode) => {
  return createMuiTheme({
    ...defaultTheme,
    palette: { mode, secondary: defaultTheme.palette?.secondary },
  });
};
