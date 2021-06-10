import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { getAllLocations } from '../utils/mongooseHelpers';

export default function Home(props) {
    const [locations, setLocations] = useState(props.locations);

    useEffect(async () => {
        const response = await fetch('/api/location');
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
                    </li>
                );
            })}
        </ul>
    );
    return (
        <div>
            <div>Traveling Locations</div>
            {locationsList}
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
