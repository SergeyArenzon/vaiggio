import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LocationInfo() {
    const router = useRouter();
    const { id } = router.query;

    const [locationData, setLocationData] = useState(null);

    useEffect(async () => {
        const response = await fetch(`/api/location/${id}`);

        const data = await response.json();

        setLocationData(data.location);
    }, []);

    const onDeleteHandler = async () => {
        const request = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(`/api/location/${id}`,request);
        const data = await response.json();
        

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
