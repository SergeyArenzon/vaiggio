// //////////////////
// Edit view location 
// //////////////////

import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function Edit() {
    const nameRef = useRef();
    const locationRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const router = useRouter();
    const { id } = router.query;
    const [session, loading] = useSession();
    

    const [locationData, setLocationData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/location/${id}`);
        const data = await response.json();
        setLocationData(data.location);
    }, []);

    const onSaveHandler = async () => {

        // Client protection
        if(locationData.email !== session.user.email){
            alert("Wrong user!")
            return;
        }
        const updatedLocation = {
            name: nameRef.current.value,
            location: locationRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
        };

        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedLocation),
        };
        const response = await fetch(`/api/location/${id}/edit`, request);
        const data = await response.json();

    };

    if (!locationData) {
        return <div>loading..</div>;
    }

    return (
        <div>
            <div>
                Name:{" "}
                <input
                    type="text"
                    defaultValue={locationData.name}
                    ref={nameRef}
                ></input>
            </div>
            <div>
                Location:{" "}
                <input
                    type="text"
                    defaultValue={locationData.location}
                    ref={locationRef}
                ></input>
            </div>
            <div>
                Price:{" "}
                <input
                    type="number"
                    defaultValue={locationData.price}
                    ref={priceRef}
                ></input>
            </div>
            <div>
                Description:{" "}
                <textarea
                    type="text"
                    defaultValue={locationData.description}
                    ref={descriptionRef}
                />
            </div>

            <div>
                <button onClick={onSaveHandler}>Save</button>
            </div>
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
