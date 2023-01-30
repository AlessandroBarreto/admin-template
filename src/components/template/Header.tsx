import useAppData from "../../hooks/useAppData";
import ChangeThemeButton from "./ChangeThemeButton";
import Title from "./Title";
import UserAvatar from "./UserAvatar";

interface HeaderProps {
  title: string;
  subtitle: string;
}
export default function Header(props: HeaderProps) {
  const { theme, changeTheme } = useAppData();
  return (
    <div className="flex justify-between">
      <Title title={props.title} subtitle={props.subtitle} />
      <div className="flex items-center">
        <ChangeThemeButton theme={theme} changeTheme={changeTheme} />
        <UserAvatar className="ml-3" />
      </div>
    </div>
  );
}
