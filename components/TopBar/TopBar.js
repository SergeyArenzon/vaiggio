import { useSession, signOut } from "next-auth/client";
// import './TopBar.css'
import Link from "next/link";

export default function TopBar() {
  const [session, loading] = useSession();

  return (
    <navbar className="flex justify-end bg-green-800 h-10">
      <ul className="flex items-center w-72 justify-evenly">
        {session && <li>{session.user.name}</li>}
        <li>
          <Link href="/">
            <a className="text-white">HOME</a>
          </Link>
          </li>
          <li>
          <Link href="/profile">
            <a className="text-white">PROFILE</a>
          </Link>
        </li>
        {session ? (
          <li className="cursor-pointer" onClick={() => signOut({ redirect: false })}>Sign Out</li>
        )
        :
        <Link href="/auth">
            <a className="text-white">Login</a>
        </Link>
      

        }
      </ul>
    </navbar>
  );
}
