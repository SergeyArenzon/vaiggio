import { useState, useRef, useEffect } from 'react';
import { userSchema } from '../../validations/user';
import { signIn, signOut } from 'next-auth/client';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import Router from 'next/router';

export default function auth() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const emailLoginRef = useRef();
    const emailPasswordRef = useRef();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [signUpMode, setSignUpMode] = useState(true);

    useEffect(() => {
        getSession().then((session) => {
            console.log('555555555');
            if (session) {
                // router.replace('/');
            } else {
                setLoading(false);
            }
        });
    }, [router]);

    const registerHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        const isValid = await userSchema.isValid(data);

        if (!isValid) {
            alert('Creds isnt valid!');
            return;
        }

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    };

    const loginHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: emailLoginRef.current.value,
            password: emailPasswordRef.current.value,
        };

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        if (!result.error) {
            // success on login!
        }
    };

    // if(loading){
    //     return <h1>Loading...</h1>
    // }

    return (
        <div>
            <form onSubmit={registerHandler}>
                <input type="email" ref={emailRef}></input>
                <input type="password" ref={passwordRef}></input>
                <button>register</button>
            </form>

            <form onSubmit={loginHandler}>
                <input type="email" ref={emailLoginRef}></input>
                <input type="password" ref={emailPasswordRef}></input>
                <button>login</button>
            </form>
            <button
                onClick={() => {
                    signOut({ redirect: false });
                    Router.push('/');
                }}
            >
                logout
            </button>
        </div>
    );
}
