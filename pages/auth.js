import { useState, useRef } from 'react';

export default function auth() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const registerHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        console.log(data);
        const response = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    };

    return (
        <div>
            <form onSubmit={registerHandler}>
                <input type="email" ref={emailRef}></input>
                <input type="password" ref={passwordRef}></input>
                <button>register</button>
            </form>
        </div>
    );
}
