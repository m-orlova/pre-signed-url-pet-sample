import { AppBar, LocalesMenuButton, RefreshIconButton } from "react-admin";
import { ModeSwitcher } from "./ModeSwitcher";

export const TopAppBar = () => (
  <AppBar
    toolbar={
      <>
        <LocalesMenuButton />
        <ModeSwitcher />
        <RefreshIconButton />
      </>
    }
  />
);
