import { useSession } from 'next-auth/client';
import Link from 'next/link';

export default function Toolbar() {
    const [session, loading] = useSession();

    console.log(loading);
    console.log(session);

    const style = {
        width: '100%',
        background: 'red',
        height: '20px',
        position: 'fixed',
        top: 0,
        zIndex: 50,
    };

    return (
        <div style={style}>
            {session ? 'loggedin' : 'NOT login'}{' '}
            <Link href="/profile">
                <a style={{ background: 'white' }}>PROFILE</a>
            </Link>
        </div>
    );
}
