import { useSession, signOut } from 'next-auth/client';

import Link from 'next/link';

export default function Toolbar() {
    const [session, loading] = useSession();

    const style = {
        width: '100%',
        background: 'red',
        height: '20px',
        position: 'fixed',
        top: 0,
        zIndex: 50,
        margin: 0,
        padding: 0,
        display: 'flex',
        listStyle: 'none'
    };

    return (
        <ul style={style} >
            {session && <li>{session.user.name}</li>}

            <li>
                <Link href="/profile">
                    <a style={{ background: 'white' }}>PROFILE</a>
                </Link>
            </li>
            {session && (
                <li onClick={() => signOut({ redirect: false })}>Sign Out</li>
            )}
        </ul>
    );
}
