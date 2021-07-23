import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getSession } from "next-auth/client";
import { route } from "next/dist/next-server/server/router";

export default function LocationInfo() {
    const router = useRouter();
    const { id } = router.query;

    const [locationData, setLocationData] = useState(null);
    const [session, setSession] = useState(null);
    const titleRef = useRef();
    const bodyRef = useRef();

    useEffect(async () => {
        const response = await fetch(`/api/location/${id}`);

        const data = await response.json();

        setLocationData(data.location);

        getSession().then((session) => {
            setSession(session);
        });
    }, []);

    const onDeleteHandler = async () => {
        // check for created location user identity
        if (session.user.email !== locationData.email) {
            alert("not the user");
            return;
        }
        const request = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/location/${id}`, request);
        const data = await response.json();
        console.log(data);
        router.replace("/");
    };

    const onCommentCreate = async (e) => {
        e.preventDefault();

        const data = {
            title: titleRef.current.value,
            body: bodyRef.current.value,
        };

        const request = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(`/api/location/${id}/comment`, request);
        console.log(response);
        // router.reload();
    };

    if (!locationData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Name:{locationData.name}</h1>
            <div>Location:{locationData.location}</div>
            <div>Price:{locationData.price}$</div>
            <div>Discription:{locationData.description}</div>

            <div>
                <Link href={`${id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button onClick={onDeleteHandler}>Delete</button>
            </div>

            <form onSubmit={onCommentCreate}>
                <input type="text" placeholder="title" ref={titleRef}></input>
                <input type="text" placeholder="body" ref={bodyRef}></input>
                <button>Submit</button>
            </form>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id,
        },
    };
}
