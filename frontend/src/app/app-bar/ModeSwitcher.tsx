import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { IconButton } from "@mui/material";
import { RaThemeOptions, useTheme } from "react-admin";
import { createModeTheme, defaultTheme } from "../themes";

const DarkModeIcon = () => {
  return <DarkModeOutlinedIcon />;
};

const LightModeIcon = () => {
  return <LightModeOutlinedIcon />;
};

export const ModeSwitcher = () => {
  const [theme, setTheme] = useTheme(defaultTheme);

  const handleClick = () => {
    const newMode = (theme as RaThemeOptions).palette?.mode === "dark" ? "light" : "dark";
    const modeTheme = createModeTheme(newMode);
    setTheme(modeTheme);
  };

  return (
    <IconButton onClick={handleClick} color="inherit">
      {(theme as RaThemeOptions).palette?.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
