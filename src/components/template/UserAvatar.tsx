import Link from "next/link";
import useAuth from "../../hooks/useAuth";

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();

  const avatarImage = user?.imgUrl ?? "/images/avatar.svg";

  return (
    <Link href="/profile">
      <img
        className={`h-10 w-10 rounded-full cursor-pointer ${props.className}`}
        src={avatarImage}
        alt="user avatar"
      />
    </Link>
  );
}
