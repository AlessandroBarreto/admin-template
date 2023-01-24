import { Adjustments, Bell, Home, Logout } from "../../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export const SideMenu = () => {
  return (
    <aside className="flex flex-col">
      <div className="flex flex-col items-center justify-center h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-800">
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem text="Home" url="/" icon={Home} />
        <MenuItem text="Settings" url="/settings" icon={Adjustments} />
        <MenuItem text="Notifications" url="/notifications" icon={Bell} />
      </ul>
      <ul>
        <MenuItem
          text="Logout"
          icon={Logout}
          className="text-red-600 hover:bg-red-400 hover:text-white"
          onClick={() => console.log("logout")}
        />
      </ul>
    </aside>
  );
};
