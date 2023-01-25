import useAppData from "../../data/hooks/useAppData";
import ChangeThemeButton from "./ChangeThemeButton";
import Title from "./Title";

interface HeaderProps {
  title: string;
  subtitle: string;
}
export default function Header(props: HeaderProps) {
  const { theme, changeTheme } = useAppData();
  return (
    <div className="flex justify-between">
      <Title title={props.title} subtitle={props.subtitle} />
      <ChangeThemeButton theme={theme} changeTheme={changeTheme} />
    </div>
  );
}
