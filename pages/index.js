import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getAllLocations } from "../services/mongooseHelpers";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home(props) {
    const [locations, setLocations] = useState(props.locations);
    const router = useRouter();

    useEffect(async () => {
        const response = await fetch("/api/location");
        const updatedLocations = await response.json();

        setLocations(updatedLocations.locations);
    }, []);

    const locationsList = (
        <ul>
            {locations.map((location, index) => {
                return (
                    <li key={location.name + index}>
                        <div>name: {location.name}</div>
                        <div>location: {location.location}</div>
                        <div>description: {location.description}</div>
                        <div>price: {location.price}</div>
                        <Link
                            type="button"
                            href={{
                                pathname: "/location/[id]",
                                query: {
                                    id: location.id,
                                },
                            }}
                        >
                            <a>Info</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
    return (
        <div>
            <div class="text-yellow-600">Traveling Locations</div>
            {locationsList}
            <button
                class="bg-green-900 px-5 py-5 rounded-xl font-extrabold	text-white cursor-pointer"
                onClick={() => router.push("/location")}
            >
                Create New Location
            </button>
        </div>
    );
}

export async function getStaticProps(context) {
    const locations = await getAllLocations();

    return {
        props: { locations: locations },
        revalidate: 300,
    };
}
