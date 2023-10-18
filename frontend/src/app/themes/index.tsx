import { PaletteMode } from "@mui/material";
import { createTheme as createMuiTheme } from "@mui/material/styles";
import { defaultTheme as defaultRATheme } from "react-admin";
import { createDefaultTheme } from "./DefaultTheme";

export const createModeTheme = (mode: PaletteMode) => {
  return createMuiTheme({
    ...defaultRATheme,
    palette: { mode, secondary: defaultTheme.palette?.secondary },
  });
};

export const defaultTheme = createDefaultTheme("light");
