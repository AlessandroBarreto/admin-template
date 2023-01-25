import { Moon, Sun } from "../../icons";

interface ChangeButtonThemeProps {
  theme: string;
  changeTheme: () => void;
}
export default function ChangeThemeButton(props: ChangeButtonThemeProps) {
  return props.theme ? (
    <div
      className="hidden sm:flex items-center cursor-pointer bg-gradient-to-r from-yellow-300 to-yellow-600 w-14 lg:w-24 h-8 p-1 rounded-full"
      onClick={props.changeTheme}
    >
      <div className="flex items-center justify-center bg-white text-yellow-600 w-6 h-6 rounded-full">
        {Sun(4)}
      </div>
      <span className="hidden lg:flex items-center ml-3 text-white">Light</span>
    </div>
  ) : (
    <div
      className="hidden sm:flex items-center justify-end cursor-pointer bg-gradient-to-r from-gray-500 to-gray-900 w-14 lg:w-24 h-8 p-1 rounded-full"
      onClick={props.changeTheme}
    >
      <span className="hidden lg:flex items-center mr-3 text-gray-300">
        Dark
      </span>
      <div className="flex items-center justify-center bg-black text-yellow-300 w-6 h-6 rounded-full">
        {Moon(4)}
      </div>
    </div>
  );
}
