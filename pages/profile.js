import { getSession } from 'next-auth/client';
import React from 'react';

export default function profile(props) {

    console.log(props.session);
    return <div>
        
        <div>Email:{props.session.user.email}</div>
        <div>Name:{props.session.user.name}</div>
        
        
        </div>;
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
}
