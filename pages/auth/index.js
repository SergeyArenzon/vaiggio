import { useState, useRef, useEffect } from 'react';
import { userSchema } from '../../validations/user';
import { signIn, signOut } from 'next-auth/client';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import Router from 'next/router';

export default function auth() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const lastNameRef = useRef();
    const firstNameRef = useRef();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [signUpMode, setSignUpMode] = useState(true);

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                // router.replace('/');
            } else {
                setLoading(false);
            }
        });
    }, [router]);

    /////////////////////
    //  Signout method //
    /////////////////////
    const registerHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
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

    ////////////////////
    //  Signin method //
    ////////////////////
    const loginHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
            
        });
        if (!result.error) {
            // success on login!
            console.log("Successfull login!");
        }
    };

    const signUpForm = (
        <form onSubmit={registerHandler}>
            <input type="email" ref={emailRef}></input>
            <input type="password" ref={passwordRef}></input>
            <input type="text" ref={firstNameRef}></input>
            <input type="text" ref={lastNameRef}></input>
            <button>register</button>
        </form>
    );

    const logInForm = (
        <form onSubmit={loginHandler}>
            <input type="email" ref={emailRef}></input>
            <input type="password" ref={passwordRef}></input>
            <button>login</button>
        </form>
    );

    return (
        <div>
            {signUpMode ? signUpForm : logInForm}

            <button onClick={() => setSignUpMode(!signUpMode)}>Switch</button>

            {/* <button
                onClick={() => {
                    signOut({ redirect: false });
                    Router.push('/');
                }}
            >
                logout
            </button> */}
        </div>
    );
}
