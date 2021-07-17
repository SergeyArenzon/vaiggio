import { useEffect, useRef, useState } from "react";
import { locationSchema } from "../../validations/location";
import { getSession } from "next-auth/client";

export default function index() {
    const nameRef = useRef();
    const locationRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const [isLoading, setIsLoading] = useState(true);
    const [loadedSession, setLoadedSession] = useState();



    if (isLoading) {
        return <div>Loading..</div>;
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const data = {
            name: nameRef.current.value,
            location: locationRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
        };

        // check for input validity
        const isValid = await locationSchema.isValid(data);

        if (isValid) {
            const response = await fetch("/api/location", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(await response.json());
        }
    };

    // console.log(session);

    return (
        <form onSubmit={submitHandler}>
            <h1>Create New Location</h1>
            <div>Name</div>
            <input type="text" ref={nameRef}></input>
            <div>Location</div>
            <input type="text" ref={locationRef}></input>
            <div>Price</div>
            <input type="number" ref={priceRef}></input>
            <div>Description</div>
            <textarea type="text" ref={descriptionRef}></textarea>
            <button>Create</button>
        </form>
    );
}


// route protector

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