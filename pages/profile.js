import { getSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function profile(props) {
    return <h1>{props.session.user.email}</h1>;
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
