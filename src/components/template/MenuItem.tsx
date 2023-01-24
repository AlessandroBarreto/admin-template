import Link from "next/link";

interface MenuItemProps {
  url?: string;
  text: string;
  icon: any;
  className?: string;
  onClick?: (event: any) => void;
}
export default function MenuItem(props: MenuItemProps) {
  const renderLink = () => {
    return (
      <div
        className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 ${props.className}`}
      >
        {props.icon}
        <span className="text-xs font-light ">{props.text}</span>
      </div>
    );
  };

  return (
    <li onClick={props.onClick} className="cursor-pointer hover:bg-gray-100">
      {props.url ? <Link href={props.url}>{renderLink()}</Link> : renderLink()}
    </li>
  );
}
