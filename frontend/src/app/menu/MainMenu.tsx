import { Menu } from "react-admin";

export const MainMenu = () => {
  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="Pet" />
    </Menu>
  );
};
